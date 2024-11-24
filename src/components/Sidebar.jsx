import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

export default function Sidebar() {
	const { isOpen } = useContext(ChatContext);

	return (
		<div
			className={`w-full md:flex-1 bg-[#161515] ${isOpen && "hidden md:block"}`}
		>
			<Navbar />
			<Search />
			<Chats />
		</div>
	);
}
