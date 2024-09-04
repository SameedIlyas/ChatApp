const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='flex space-x-4'>
			<div className='flex items-center'>
				<input
					type='checkbox'
					className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
					checked={selectedGender === "male"}
					onChange={() => onCheckboxChange("male")}
				/>
				<label className='ml-2 text-gray-400'>Male</label>
			</div>
			<div className='flex items-center'>
				<input
					type='checkbox'
					className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
					checked={selectedGender === "female"}
					onChange={() => onCheckboxChange("female")}
				/>
				<label className='ml-2 text-gray-400'>Female</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;
