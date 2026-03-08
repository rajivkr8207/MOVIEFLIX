import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGODB: process.env.MONGODB,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;