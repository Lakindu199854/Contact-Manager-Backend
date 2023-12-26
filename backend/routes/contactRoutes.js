const express = require("express");
const router = express.Router();
const {getContact,getContactById,createContact,updateContactById,deleteContactById}=require("../controller/contactController");
const validateToken = require("../middlewere/validateTokenHandler");

//Using validateToken on all the routes
router.use(validateToken);
//Now lets configure the routes
router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getContactById).put(updateContactById).delete(deleteContactById);


//Here we export the route
module.exports = router;