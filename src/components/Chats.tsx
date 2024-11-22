import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Chats() {
	const [chats, setChats] = useState<Record<string, any>>({});

	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
				const data = doc.data();
				setChats(data || {});
			});

			return () => {
				unsub();
			};
		};
		currentUser?.uid && getChats();
	}, [currentUser?.uid]);

	const handleSelect = (u) => {
		dispatch({ type: "CHANGE_USER", payload: u });
	};

	return (
		<div className="chats">
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}
						className="flex items-center text-white cursor-pointer hover:bg-[#1d1c1c] gap-3 px-3 py-2 transition-all"
					>
						<img
							src={chat[1].userInfo.photoURL}
							alt="img"
							className="w-[40px] h-[40px] rounded-full object-cover"
						/>
						<div>
							<span className="font-medium">
								{chat[1].userInfo.displayName}
							</span>
							<p className="text-[lightgray] text-[14px]">
								{chat[1].lastMessage?.text}
							</p>
						</div>
					</div>
				))}
		</div>
	);
}
