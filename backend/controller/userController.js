const asyncHandler = require("express-async-handler");
//Importing userModel
const User = require("../models/userModel");
//importing bcrypt library
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async(req,res)=>{
    //When the user gives username,password and the name in request body here we aqquire it
    const {username,email,password}=req.body;
    //Now lets do a check
    if(!username || !email || !password){
        //Here we do the validation and if one of these empty we pass 400 status code
        res.status(400);
        //When fields are empty we throw an error
        throw new Error("All fields are mandatory!");
    }
    //Now lets check if the email exists
    //Here we have to pass the email as an object
    //We can write this as const userAvailable = await User.findOne({ email: email });
    //Here the variable name and the property name is same,so we can shorten it.
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User exists!");
    }
    //When there are no user already in that email we create a new user
    //Create the hash password using bcrypt
    //bcrypt gives a promise thus we use a await
    //10 is the cost factor.And controls the 
    //computational cost of the hash function
    const hashedPassword = await bcrypt.hash(password,10);
    //Here we log the hashed password
    console.log("Hashed password is :",hashedPassword)
    const user = await User.create({
        username,
        email,
        //As the value of the password is not just "password" we have to write it
        password:hashedPassword,
    });
    console.log(`User created successfully ${user}`);
    if(user){
        //We send 201 status code when successfully created
        //Then we pass the id and the email address
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        //If there is an error we throw an error
        res.status(400);
        throw new Error("User data is not valid");
    }
   
});

const loginUser = asyncHandler(async(req,res)=>{
    //First retrive the data from the body
     const {email,password}=req.body;
    //Check if the data is empty
     if(!email || !password){
        res.status(400);
        throw new Eroor("All fields are mandatory")
     }
     const user = await User.findOne({email:email});
     //Lets compare the password with the hashed password
     if(user && (await bcrypt.compare(password,user.password))){
        //Lets create a access token
        //jwt has a methood for sign in.And inside that we can send few parameters
        //such as payload,.In payload we send user info like name and email
        //Here we pass a user object as the payload
        const accessToken=jwt.sign({
            user:{
                username :user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        //To access something from environment variable,we use process code module
        //just like above

        //Now lets define the expiration time
        {expiresIn:"50m"}
        )
        //If this matches we provide a access token in the response
        //We pass it in the json
        res.status(200).json({accessToken});
     }else{
        //If password does not match with the hashed password
        res.status(401);
        throw new Error("Email or password is not correct");
     }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUserInfo = asyncHandler(async(req,res)=>{
    res.json(req.user);
});


module.exports={registerUser,loginUser,currentUserInfo}