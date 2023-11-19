const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/Collection1", {

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
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        required:true,
        enum:["M","F"]
    },
    course:{
        type:String,
        required:true,
        enum:["Btech","Mtech","Phd","MCA"]  //must be i thses only

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
        required:true,
        trim:true
    }
   
    

});

const Collection =new mongoose.model("LoginPage",LoginInSchema)
// const students = async()=>{
//     try{
//         const std1 = new Collection({
//             name: "Sumit" ,
//             reg_no: 20331452,
//             hostel: "Patel",
//             password:"201452",
//             year : 2023,
//             course: "Btech",
//             gender:"M"
           
        
//         })
//         const std2 = new Collection({
//             name: "Sumit" ,
//             reg_no: 20331451,
//             hostel: "Patel",
//             password:"201472",
//             year : 2023,
//             course: "Btech",
//             gender:"M"
           
        
//         })
//         const std3 = new Collection({
//             name: "Sumit" ,
//             reg_no: 20331458,
//             hostel: "Patel",
//             password:"203452",
//             year : 2023,
//             course: "Btech",
//             gender:"M"
           
        
//         })
//         const result = await Collection.insertMany([std1,std2,std3])
      
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// students()
module.exports=Collection