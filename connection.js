const mongoose = require("mongoose")
require("dotenv").config()

async function connectMongoDB(){
    mongoose.connect(process.env.MONGODB_URI)
}

module.exports = {
    connectMongoDB
}