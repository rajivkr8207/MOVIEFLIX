import jwt from "jsonwebtoken";

export const IdentifyUser = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded
            next()
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });

    }
};