//Import mongoose
const mongoose=require("mongoose");
//Create a schema which will contain all the contact details
const contactSchema = mongoose.Schema({
    //Within this {} a object which has all the fields to define a contact
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        //We have to provide the reference of the model
        ref:"User",
    },
    name:{
        type:String, 
        required :[true,"Please add the contact name"],
    },
    email:{
        type:String,
        required :[true,"Please add the contact email"],
    },
    phone:{
        type:String,
        required :[true,"Please add the phone number"],
    },
    
},{
    timestamps:true,
})

//Here we provide the name of the model as contact and export the contactSchema
module.exports = mongoose.model("Contact",contactSchema);