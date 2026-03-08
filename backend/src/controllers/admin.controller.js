import UserModel from "../models/user.models.js";


export const getAllUsers = async (req, res) => {
    try {

        const users = await UserModel.find({
            role: "user"
        }).select("-password");

        const totalUsers = await UserModel.countDocuments();

        const activeUsers = await UserModel.countDocuments({
            isBlocked: false
        });

        const blockedUsers = await UserModel.countDocuments({
            isBlocked: true
        });

        res.status(200).json({
            success: true,

            stats: {
                totalUsers,
                activeUsers,
                blockedUsers
            },

            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



/**
 * Block UserModel
 */
export const blockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndUpdate(
            id,
            { isBlock: true },
            { new: true }

        )

        res.status(200).json({
            success: true,
            message: "user blocked successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



/**
 * Unblock UserModel
 */
export const unblockUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await UserModel.findByIdAndUpdate(
            id,
            { isBlock: false },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



/**
 * Delete User
 */
export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await UserModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

