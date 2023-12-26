const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    //Here within {} we define a user objecct
    //This object user has 3 properties
    //Here we define all the 3 properties
    username: {
      type: String,
      //username is required.Thus we make it true
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      //As the email has to be unique we make it so
      //When someone tries to put the same email then below message shows
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    //Here we add the timestamp
    Timestamps: true,
  }
);

//Here we export the model and we name it as user
module.exports = mongoose.model("User", userSchema);
