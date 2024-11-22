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
			className={`message ${message.senderId === currentUser.uid && "owner"}`}
		>
			<div className="messageInfo">
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt="img"
				/>
				<span>just now</span>
			</div>
			<div className="messageContent">
				<p>{message.text}</p>
				{message.img && <img src={message.img} alt="" />}
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
