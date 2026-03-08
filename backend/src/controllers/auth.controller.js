import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";



export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        console.log(name, email, password)
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await UserModel.create({
            name,
            email,
            password
        });
        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie('token', token)

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


export const getProfile = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user.id);

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const get_me = async (req, res) => {
    try {
        const user = req.user

        res.status(200).json({
            user: {
                id: user.id,
                role: user.role
            }
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};