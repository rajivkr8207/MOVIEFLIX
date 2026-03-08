import app from "./src/app.js";
import config from "./src/config/config.js";
import ConnectDB from "./src/config/database.js";

const PORT = config.PORT

ConnectDB()
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})