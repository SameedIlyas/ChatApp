import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading && (
				<div className='flex justify-center items-center mt-4'>
					<div className='w-6 h-6 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin'></div>
				</div>
			)}
		</div>
	);
};

export default Conversations;
