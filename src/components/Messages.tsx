import React, { useContext, useEffect, useState } from "react";
import Message from "../components/Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Messages() {
	const [messages, setMessages] = useState<Record<string, any>>([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);

	return (
		<div className="messages">
			{messages.map((m) => (
				<Message message={m} key={m.id} />
			))}
		</div>
	);
}
