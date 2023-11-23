const mongoose = require("mongoose");

const connectTomongo = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/collection1", {});
        console.log("  ");
    } catch (error) {
        console.log("failed to connect");
        throw error; 
    }
};

const ComplaintSchema =new mongoose.Schema({
    category:{
        type:String,
        required:true
       
    },
    complaint:{
        type:String,
    }, 
    status :{
        type:String,
    },
    name:{
        type:String,
    },
    reg_no:{
        type:Number
    }

});

const complaint =new mongoose.model("complaint",ComplaintSchema)

module.exports = {
    connectTomongo,
    complaint:complaint
};
