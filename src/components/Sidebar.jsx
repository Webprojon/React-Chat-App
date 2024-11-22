import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";

export default function Sidebar() {
	return (
		<div className="flex-1 bg-[#161515]">
			<Navbar />
			<Search />
			<Chats />
		</div>
	);
}
