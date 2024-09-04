import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`relative w-12 h-12 ${isOnline ? "border-2 border-green-400" : ""}`}>
					<img className='w-full h-full rounded-full' src={conversation.profilePic} alt='user avatar' />
					{isOnline && (
						<div className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
					)}
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='my-1 border-t border-gray-300' />}
		</>
	);
};

export default Conversation;
