const mongo = require('mongoose');


const userschema = mongo.Schema({    //& When adding properties check the authcontroller.signup !! 
    fname : {
        type : String,
    },
    lname : {
        type:String,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    role : {
        type : String
    }
   
});




const User = mongo.model('User' , userschema);
module.exports = User;