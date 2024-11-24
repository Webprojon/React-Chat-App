import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="h-[80px] md:h-[60px] flex items-center justify-between p-3 bg-[#141313]">
			<div className="flex items-center gap-3">
				<img
					src={currentUser.photoURL}
					alt="profile img"
					className="w-[45px] h-[45px] md:w-[37px] md:h-[37px] rounded-[50%] object-cover bg-#eee"
				/>
				<span className="font-bold tracking-wider">
					{currentUser.displayName}
				</span>
			</div>
			<button
				className="bg-[#d8d8d8] text-[#252323] rounded-sm cursor-pointer text-[14px] py-1 px-3 md:py-[3px] md:px-2"
				onClick={() => signOut(auth)}
			>
				Logout
			</button>
		</div>
	);
}
