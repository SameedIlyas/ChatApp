import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
			<div className='w-full max-w-md p-6 rounded-lg shadow-md bg-gray-800 bg-opacity-80'>
				<h1 className='text-3xl font-semibold text-center text-gray-300 mb-6'>
					Sign Up
				</h1>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Full Name</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Username</label>
						<input
							type='text'
							placeholder='johndoe'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.userName}
							onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div className='mb-4'>
						<label className='block text-gray-400 mb-2'>Confirm Password</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full px-3 py-2 text-gray-800 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link to='/login' className='text-sm text-blue-500 hover:underline block mt-4 mb-4'>
						Already have an account?
					</Link>

					<div>
						<button
							type='submit'
							className='w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
							disabled={loading}
						>
							{loading ? <span className='animate-spin h-5 w-5 border-t-2 border-white border-opacity-25 rounded-full'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
