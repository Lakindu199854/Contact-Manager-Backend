 //Import both the asynchandler and the jwt
 const asyncHandler = require("express-async-handler");
 const jwt = require("jsonwebtoken");

 //Function to validate the token
 const validateToken = asyncHandler(async(req,res,next)=>{
    //Create a token variable
    let token;
    //As the token comes in the autherization header,here we get it.
    let authHeader = req.headers.Authorization || req.headers.authorization;
    //Now lets do a check and see if the authHeader starts with "Bearer"
    if(authHeader && authHeader.startsWith("Bearer")){
        //0 index of the split is "Bearer" 1st index of the split is the "token"
        token = authHeader.split(" ")[1];
        //lets verify the token.We use verify method and we pass 3 parameters to it
        //3rd parameter is a call back function
        //decoded = decoded inforamation
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            //Here after extracting the info that was embedded in the token,
            //Store the authenticated user's information in the req.user 
            req.user=decoded.user;
            //Allow the request to move on to the next middleware or route handler in the chain
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("User is not authorized");
        }
    }
 })

 module.exports = validateToken;