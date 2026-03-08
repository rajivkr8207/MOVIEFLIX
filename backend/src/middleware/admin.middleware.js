
export const isAdmin = async (req, res, next) => {
    try {
        const role = req.user.role
        if (!role) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }
        next();

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });

    }
};