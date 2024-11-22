import React, { useContext } from "react";
import Message from "../components/Message";
import { ChatContext } from "../context/ChatContext";

export default function Messages() {
	const { data } = useContext(ChatContext);

	return <div className="messages">{/*<Message />*/}</div>;
}
