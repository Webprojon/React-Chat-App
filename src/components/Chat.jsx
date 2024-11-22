import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
	const { data } = useContext(ChatContext);

	return (
		<div className="chat">
			<div className="chatInfo">
				<span>{data.user?.displayName}</span>
				<div className="chatIcons">
					<img src={Cam} alt="camera img" />
					<img src={Add} alt="add img" />
					<img src={More} alt="more settings" />
				</div>
			</div>

			<Messages />
			<Input />
		</div>
	);
}
