import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target[0].value;
		const password = e.target[1].value;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">React Chat App</span>
				<span className="title">Login</span>
				<form onSubmit={handleSubmit}>
					<input type="email" required placeholder="Enter email" />
					<input type="password" required placeholder="Enter password" />
					<button>Sign in</button>
					{error && <span>Something went wrong: {error}</span>}
				</form>
				<p>
					You dont have an account ? <Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
}
