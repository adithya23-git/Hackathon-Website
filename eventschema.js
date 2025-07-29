const mongo = require('mongoose');


const eventschema = mongo.Schema({    //& When adding properties check the authcontroller.signup !! 
    title : {
        type : String
    },
    description : {
        type:String
    },
    domain : {
        type : String
    },
    startdate : {
        type : Date
    },
    lastdate : {
        type : Date
    },
    prize:{
        type:Number
    }
   
});




const event = mongo.model('EVENT' , eventschema);
module.exports = event;