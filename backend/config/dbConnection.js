//Import the mongoose
const mongoose = require("mongoose")

//Create a function
const connectDb = async()=>{
    try{
        //Here we pass our connection string in .env to the method connect
        const connect=await mongoose.connect(process.env.CONNECTION_STRING)
        //Put a console log when the connection to the database is established
        //We can add some properties of the connection also
        console.log("Database Connected",connect.connection.host,connect.connection.name);
    }catch(err){
        //If there is an error log the error
        console.log(err);
        //If there is an error exit
        process.exit(1);
    }
}
//Exporting connectionDb
module.exports = connectDb;