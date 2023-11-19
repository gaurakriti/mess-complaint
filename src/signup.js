const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/collection1", {
   

}) // name of database
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LoginInSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    reg_no:{
        type:Number,
        required:true,
        unique:true
    },
    hostel:{
        type:String,
        required:true
    }
   
    

});

const collection =new mongoose.model("loginPage",LoginInSchema)

module.exports=collection