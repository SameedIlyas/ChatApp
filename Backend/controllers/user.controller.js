import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


// Search users by username
export const getUserbyUsername = async (req, res) => {
	const { username } = req.query;
  
	if (!username || username.length < 3) {
	  return res.status(400).json({ message: 'Search term must be at least 3 characters long' });
	}
  
	try {
	  const users = await User.find({ userName: new RegExp(username, 'i') }).select('userName fullName');
  
	  if (users.length === 0) {
		return res.status(404).json({ message: 'No users found' });
	  }
  
	  res.json({ users });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  };