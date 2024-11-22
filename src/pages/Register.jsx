import { useState } from "react";
import { auth, db, storage } from "../firebase";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const [error, setError] = useState(null);
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
					setError(error.message);
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
			setError(err.message);
		}
	};

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">React Chat App</span>
				<span className="title">Register</span>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Enter name" />
					<input type="email" placeholder="Enter email" />
					<input type="password" placeholder="Enter password" />
					<input style={{ display: "none" }} type="file" id="file" />
					<label htmlFor="file">
						<img src={Add} alt="add avatar img" />
						<span>Add an avatar</span>
					</label>
					<button>Sign up</button>
					{error && <span>Something went wrong: {error}</span>}
				</form>
				<p>
					You do have an account ? <Link to="/login">Login</Link>
				</p>
			</div>
		</div>
	);
}
