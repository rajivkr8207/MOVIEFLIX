import UserModel from "../models/user.models.js";


export const getAllUsers = async (req, res) => {
    try {

        const users = await UserModel.find().select("-password");

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
            { isBlocked: true },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "UserModel blocked successfully",
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
            { isBlocked: false },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "UserModel unblocked successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};