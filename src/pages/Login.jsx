import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			if (err) {
				setError(true);
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-[100vh] bg-[#d8d8d8]">
			<div className="w-[420px] rounded-[8px] flex flex-col items-center text-[lightgray] bg-[#1d1c1c] px-[50px] py-[10px]">
				<span className="text-[24px] font-medium">React Chat App</span>
				<span className="mb-2">Login</span>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full space-y-4"
				>
					<input
						type="email"
						required
						placeholder="Enter email"
						className="py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>
					<input
						type="password"
						required
						placeholder="Enter password"
						className="py-2 px-3 rounded-md outline-none text-[lightgray] placeholder:text-[lightgray] bg-[#302e2e]"
					/>

					<button className="p-2 rounded-md text-[#252323] bg-[#ccc] hover:bg-[#b3b2b2] transition-all">
						Sign in
					</button>
					{error && (
						<span className="text-red-500">Invalid email or password !</span>
					)}
				</form>
				<p className="mt-3">
					You dont have an account ? <Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
}
