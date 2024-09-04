import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(userName, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
			<div className='w-full max-w-md p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-80'>
				<h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
					Login
				</h1>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Username</label>
						<input
							type='text'
							placeholder='Enter Username'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<Link to='/signup' className='text-sm text-blue-500 hover:underline block mb-4'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button
							type='submit'
							className='w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
							disabled={loading}
						>
							{loading ? <span className='animate-spin h-5 w-5 border-t-2 border-white border-opacity-25 rounded-full'></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
