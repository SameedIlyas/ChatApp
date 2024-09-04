import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<div className='flex justify-center items-center'>
					<div className='w-6 h-6 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin'></div>
				</div>
			)}
		</div>
	);
};

export default LogoutButton;
