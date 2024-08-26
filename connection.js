const mongoose = require("mongoose")
require("dotenv").config()

async function connectMongoDBAtlas(){
    mongoose.connect(process.env.MONGODB_ATLAS, {dbName: "notesDB"})
}

module.exports = {
    connectMongoDBAtlas
}