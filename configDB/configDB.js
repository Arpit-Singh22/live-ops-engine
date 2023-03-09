const mongoose = require("mongoose")
require("dotenv").config()

const configDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB is live at ${process.env.MONGODB_URL}`)
    }
    catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

configDB()

