import mongoose from "mongoose";
import config from "./config.js";

const ConnectDB = () => {
    mongoose.connect(config.MONGODB)
        .then(() => {
            console.log(`MONGO db is connect successfully`)
        })
        .catch((err) => {
            console.log(err)
            process.exit(1)
        })
}
export default ConnectDB;