//Import the constants
const {constants}=require("../constants");
//This has 4 parameters
const errorHandler = (err,req,res,next)=>{
    //If we have a status code we pass it,and if we dont have one we pass 500.
    const statusCode = res.statuwsCode ? res.statusCode : 500;
    switch(statusCode){
        //When the status code is 400,pass this response
        case constants.VALIDATION_ERROR:
            res.json({title: "Valiidation Failed",message: err.message,stackTrace: err.stack});
            break;
        //When the status code is 404,pass this response
        case constants.NOT_FOUND:
            res.json({title: "Not Found",message: err.message,stackTrace: err.stack});
        case constants.FORBIDDEN:
            res.json({title: "Forbiddened",message: err.message,stackTrace: err.stack});
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized",message: err.message,stackTrace: err.stack});
        case constants.SERVER_ERROR:
            res.json({title: "Internal Server Error",message: err.message,stackTrace: err.stack});
        default:
            //In the default case we write "No error"
            console.log("No Error")
            break; 
    }
};
module.exports = errorHandler;

