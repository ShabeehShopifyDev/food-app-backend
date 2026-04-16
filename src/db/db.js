const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.NONGO_URI);

        console.log("Connected to db");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;