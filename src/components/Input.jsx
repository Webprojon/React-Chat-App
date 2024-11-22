import Img from "../images/img.png";
import Attach from "../images/attach.png";

export default function Input() {
	return (
		<div className="input">
			<input type="text" placeholder="Type something..." />

			<div className="send">
				<img src={Attach} alt="attach img" />
				<input type="file" id="file" style={{ display: "none" }} />
				<label htmlFor="file">
					<img src={Img} alt="img" />
				</label>
				<button>Send</button>
			</div>
		</div>
	);
}
