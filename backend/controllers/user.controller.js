import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password") // find all the user expect this user id
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in get user for sidebar",error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
};
