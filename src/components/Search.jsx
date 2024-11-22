import { useContext, useState } from "react";
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Search() {
	const [userName, setUserName] = useState("");
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const { currentUser } = useContext(AuthContext);

	const handleSearch = async () => {
		const q = query(
			collection(db, "users"),
			where("displayName", "==", userName),
		);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (err) {
			setError(err.message);
		}
	};

	const handleKey = (e) => {
		e.code === "Enter" && handleSearch();
	};

	const handleSelect = async () => {
		console.log(user);
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;

		try {
			const response = await getDoc(doc(db, "chats", combinedId));

			if (!response.exists()) {
				await setDoc(doc(db, "chats", combinedId), { messages: [] });

				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});

				await updateDoc(doc(db, "userChats", user.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
					},
					[combinedId + ".date"]: serverTimestamp(),
				});
			}
		} catch (err) {
			setError(err.message);
		}

		setUser(null);
		setUserName("");
	};

	return (
		<div className="border-b border-gray-300">
			<div className="p-3">
				<input
					type="text"
					value={userName}
					placeholder="Find a user"
					onKeyDown={handleKey}
					onChange={(e) => setUserName(e.target.value)}
					className="outline-none text-[lightgray] placeholder:text-[lightgray] bg-transparent"
				/>
			</div>
			{error && <span>User not found!</span>}
			{user && (
				<div
					onClick={handleSelect}
					className="flex items-center text-white cursor-pointer hover:bg-[#1d1c1c] gap-2 px-3 py-2 transition-all"
				>
					<img
						src={user.photoURL}
						alt="profile img"
						className="w-[40px] h-[40px] rounded-full object-cover"
					/>
					<div>
						<span className="font-medium text-[18px]">{user.displayName}</span>
					</div>
				</div>
			)}
		</div>
	);
}
