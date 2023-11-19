const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path=require("path")
const  hbs = require("hbs");
app.use(bodyParser.json());

// const { domainToASCII } = require('url');
// const asciiDomain = domainToASCII(unicodeDomain);



// require("./mongodb.js");  //
const Collection=require("./mongodb");


const templatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');


app.use(express.json());
app.set("view engine","hbs");
app.set("views",templatePath)
hbs.registerPartials(partialsPath)

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routing 
app.get("/", (req,res)=>{
    res.render("login");
})

// login check
app.post("/login",async(req,res)=>{

    try{
       const name = req.body.name;
       const password= req.body.password;
         
      const user = await Collection.findOne({name});
     
        if(user.password === password) {
         res.status(201).redirect("/student");
     }
     
        else
         res.send("Incorrect username or password");
     
   }
    catch(error){
       console.log(error);
       res.send("wrong details");
       
    }
    
})
app.get("/signup", (req,res)=>{
   res.render("signup");
})
app.get("/student", (req,res)=>{
    res.render("student");
 })

app.post("/signup",async(req,res)=>{
   try{
    
    

    //  const user = await collection.findOne({name:name});
    //  if (user && user.gender && user.gender === gender && user.course && user.course === course && user.year && user.year === year && user.hostel && user.hostel === hostel && user.reg_no && user.reg_no === reg_no ) {
    //     res.status(201).render("/");
    // } else {
    //     res.send("Incorrect username or password");
    // }
      const data={
      
      name:req.body.name,
      gender:req.body.gender,
      course:req.body.course,
       year:req.body.year,
       reg_no:req.body.reg_no,
       hostel:req.body.hostel,
       password:req.body.password
   };

   await collection.insertMany([data]);
   
}
catch(error) {
    console.log(error);
}
})
app.get("/std", (req,res)=>{
    res.render("std")
})

// create server
app.listen(3000,()=>{
    console.log("server started");
})



