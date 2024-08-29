const mongoose = require("mongoose")
require("dotenv").config()

// async function connectMongoDBAtlas(){
//     mongoose.connect(process.env.MONGODB_LOCAL, {dbName: "notesDB"})
// }

async function connectMongoDBAtlas(){
    mongoose.connect(process.env.MONGODB_LOCAL)
}

module.exports = {
    connectMongoDBAtlas
}