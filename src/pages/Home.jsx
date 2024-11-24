import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-[#d8d8d8] h-[100vh] flex justify-center items-center">
			<div className="h-screen w-full md:w-[65%] md:h-[80%] flex md:rounded-md text-white overflow-hidden">
				<Sidebar />
				<Chat />
			</div>
		</div>
	);
}
