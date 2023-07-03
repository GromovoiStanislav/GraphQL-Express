const app = require("./app");
const {connectDB} = require("./db");
const {PORT} = require("./config");


const start = async () => {
    await connectDB();
    await app.listen(PORT);
    console.log("Server on port", PORT);
}

start();