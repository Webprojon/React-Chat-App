import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

function App() {
	const { currentUser, isLoading, fetchUserInfo } = useUserStore();
	const { chatId } = useChatStore();

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			fetchUserInfo(user?.uid);
		});

		return () => {
			unSub();
		};
	}, [fetchUserInfo]);

	if (isLoading) return <div className="text-[40px]">Loading...</div>;

	return (
		<div className="flex select-none w-[87vw] h-[90vh] rounded-md bg-[rgba(17,25,40,0.75)] backdrop-blur-[18px] backdrop-saturate-[180%] border border-[#545454]">
			{currentUser ? (
				<>
					<List />
					{chatId && <Chat />}
					{chatId && <Detail />}
				</>
			) : (
				<Login />
			)}

			<Toaster position="top-center" />
		</div>
	);
}

export default App;
