import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border border-gray-600 text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white placeholder-gray-400'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 right-0 flex items-center pr-3'>
					{loading ? (
						<div className='w-6 h-6 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin'></div>
					) : (
						<BsSend className='text-white' />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
