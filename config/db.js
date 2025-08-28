const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })


        console.log(`Mongo DB connected successfully! DB HPST ${connectionInstance.connection.host}:` )
    } catch (error) {
        console.log("Error connecting to database", error)
        process.exit(1);
    }
    
}

module.exports = connectDB