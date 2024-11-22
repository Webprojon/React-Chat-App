import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-[#d8d8d8] h-[100vh] flex justify-center items-center">
			<div className="w-[65%] h-[80%] flex rounded-md text-white overflow-hidden">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}
