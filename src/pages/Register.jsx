import { useState } from "react";
import { auth, db, storage } from "../firebase";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const storageRef = ref(storage, displayName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					if (error) {
						setError(true);
					}
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(response.user, {
							displayName,
							photoURL: downloadURL,
						});

						await setDoc(doc(db, "users", response.user.uid), {
							uid: response.user.uid,
							displayName,
							email,
							photoURL: downloadURL,
						});

						await setDoc(doc(db, "userChats", response.user.uid), {});

						navigate("/");
					});
				},
			);
		} catch (err) {
			if (err) {
				setError(true);
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-[100vh] bg-[#d8d8d8]">
			<div className="w-[92%] lg:w-[420px] rounded-[8px] flex flex-col items-center text-[lightgray] bg-[#1d1c1c] px-5 md:px-[50px] py-[10px]">
				<span className="text-[24px] font-medium">React Chat App</span>
				<span className="mb-2">Register</span>
				<form
					className="flex flex-col w-full space-y-5 md:space-y-4"
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						placeholder="Enter name"
						className="py-3 sm:py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>
					<input
						type="email"
						placeholder="Enter email"
						className="py-3 sm:py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>
					<input
						type="password"
						placeholder="Enter password"
						className="py-3 sm:py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>
					<input
						style={{ display: "none" }}
						type="file"
						id="file"
						className="py-3 sm:py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>
					<label
						htmlFor="file"
						className="flex items-center cursor-pointer space-x-3"
					>
						<img src={Add} alt="add avatar img" className="w-[34px]" />
						<span>Add an avatar</span>
					</label>
					<button className="py-3 sm:py-2 p-2 rounded-md text-[#252323] bg-[#ccc] hover:bg-[#b3b2b2] transition-all">
						Sign up
					</button>
					{error && <span className="text-red-500">Something went wrong</span>}
				</form>
				<p className="mt-4">
					You do have an account ? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
}
