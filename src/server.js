const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
const menuSchema = new mongoose.Schema({
  day: String,
  meal: String,
  item: String
});

const Menu = mongoose.model('Menu', menuSchema);

mongoose.connect('mongodb://0.0.0.0:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log( error);
  });

const path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,  'index.html'));
});

app.get('/logout', (req, res) => {
  res.send('Logout');
});

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
      trm:true
  }
 
  

});

const Collection =new mongoose.model("LoginPage",LoginInSchema)

const students = async()=>{
  try{
      const std1 = new Collection({
          name: "Sumit" ,
          reg_no: 50331452,
          hostel: "Patel",
          password:"281452",
          year : 2023,
          course: "Btech",
          gender:"M"
         
      
      })
      const std2 = new Collection({
          name: "Sumit" ,
          reg_no: 50331451,
          hostel: "Patel",
          password:"208472",
          year : 2023,
          course: "Btech",
          gender:"M"
         
      
      })
      const std3 = new Collection({
          name: "Sumit" ,
          reg_no: 50331458,
          hostel: "Patel",
          password:"283452",
          year : 2023,
          course: "Btech",
          gender:"M"
         
      
      })
      mongoose.collection.find({name:"sumit"}).pretty;
      const result = await Collection.insertMany([std1,std2,std3])
      console.log(result)

  }
  catch(err){
      console.log(err);
  }
}
students()

module.exports=Collection

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
