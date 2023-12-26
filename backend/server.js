//Creating the express server
const express = require('express');
const errorHandler = require('./middlewere/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();

connectDb();
const app=express();
//Define the port
const port=process.env.PORT || 5000;
//It will use the value from the environment variable PORT if available,
//otherwise default to port 5000.

app.use(express.json());
//This is going to provide a passer which will help us to pass the data which we recieve
//from the client to the server side

//As /api/contacts is a common api url for every api we use it here
//This app.use is a middlewere
app.use("/api/contacts",require("./routes/contactRoutes"));

//This api is used to register users and login users
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler) 

//Now as we have created the app,now lets listen on the app in the port
//And the port will give us a callback
app.listen(port,()=>{
    console.log(`Server running on the port ${port}`);
}); 