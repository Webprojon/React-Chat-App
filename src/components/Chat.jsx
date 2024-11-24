import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { GoArrowLeft } from "react-icons/go";

export default function Chat() {
	const { data, setIsOpen, isOpen } = useContext(ChatContext);

	return (
		<div className={`flex-[2] bg-[#1d1c1c] ${!isOpen && "hidden md:block"}`}>
			<div className="bg-[#222121] text-[lightgray] h-[60px] flex items-center justify-between p-4">
				<div className="flex">
					<GoArrowLeft
						onClick={() => setIsOpen(!isOpen)}
						className="text-[#eee] size-6 mr-4 md:hidden"
					/>
					<span className="text-[18px] font-medium">
						{data.user?.displayName}
					</span>
				</div>

				<div className="flex gap-x-2 cursor-pointer">
					<img src={Cam} alt="camera img" className="h-[24px]" />
					<img src={Add} alt="add img" className="h-[24px]" />
					<img src={More} alt="more settings" className="h-[24px]" />
				</div>
			</div>

			<Messages />
			<Input />
		</div>
	);
}
