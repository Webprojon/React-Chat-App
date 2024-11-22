import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import PropTypes from "prop-types";

export default function Message({ message }) {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, [message]);

	return (
		<div
			ref={ref}
			className={`message flex gap-4 ${
				message.senderId === currentUser.uid && "owner flex-row-reverse"
			}`}
		>
			<div className="font-thin text-[#ccc] flex flex-col">
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt="img"
					className="w-[40px] h-[40px] rounded-full object-cover"
				/>
				<span>just now</span>
			</div>

			<div className="messageContent flex flex-col max-w-[80%] gap-3">
				<p className="mt-8 px-4 py-1 text-[15px] text-[#302e2e] bg-[#d8d8d8] max-w-max rounded-[0px_6px_6px_6px]">
					{message.text}
				</p>
				{message.img && (
					<img src={message.img} alt="img" className="w-[44%] rounded-md" />
				)}
			</div>
		</div>
	);
}

Message.propTypes = {
	message: PropTypes.shape({
		senderId: PropTypes.string.isRequired,
		text: PropTypes.string,
		img: PropTypes.string,
	}).isRequired,
};
