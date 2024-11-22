import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<div className="user">
				<img src={currentUser.photoURL} alt="profile img" />
				<span>{currentUser.displayName}</span>
			</div>
			<button onClick={() => signOut(auth)}>Logout</button>
		</div>
	);
}
