import Img from "../images/img.png";
import Attach from "../images/attach.png";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuid());
			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								img: downloadURL,
							}),
						});
					});
				},
			);
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});

		setText("");
		setImg(null);
	};

	return (
		<div className="h-[60px] bg-[#222121] p-3 flex input">
			<input
				type="text"
				value={text}
				placeholder="Type something..."
				onChange={(e) => setText(e.target.value)}
				className="w-full border-none outline-none bg-transparent text-[lightgray] placeholder:text-[lightgray]"
			/>

			<div className="flex items-center gap-3 cursor-pointer">
				<img src={Attach} alt="attach img" className="w-[40px] h-[24px]" />
				<input
					type="file"
					id="file"
					style={{ display: "none" }}
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label htmlFor="file">
					<img src={Img} alt="img" className="w-[40px] h-[24px]" />
				</label>
				<button
					onClick={handleSend}
					className="border-none py-[2px] px-3 rounded-md bg-[#0E5FC2]"
				>
					Send
				</button>
			</div>
		</div>
	);
}
