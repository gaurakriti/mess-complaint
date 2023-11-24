    const express = require("express");
    const bodyParser = require("body-parser");
    const app = express();
    const path=require("path")
    const  hbs = require("hbs");
    const session = require('express-session');
    app.use(bodyParser.json());

    app.use(session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true
    }));



    require("./mongodb");  //
    const { connectToDatabase, collection1 } = require('./mongodb');
    const {complaint,connectTomongo} = require('./register_complaint')
    connectToDatabase()
    connectTomongo()

    
    const templatePath = path.join(__dirname,'../templates/views');
    const partialsPath = path.join(__dirname, '/templates/partials');


    app.use(express.json());
    app.set("view engine","hbs");
    app.set("views",templatePath)
    hbs.registerPartials(partialsPath)

    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));


    // routing 
    app.get("/", (req,res)=>{
        res.render("login");
    })
    app.get('/login',(req,res)=>{
        res.render("login")
    })

    // login check
    app.post("/login",async(req,res)=>{

        try{
        const name = req.body.name;
        const password= req.body.password;
        const reg_no=req.body.reg_no;
        const user = await collection1.findOne({password:password});
            if(user && user.password === password) {
                const complaints = await complaint.find();
                console.log(user);
               console.log(complaints)
                res.render('student',{ student: user , complaints: complaints});
                
            }
         
            else{
            console.log('error');
            res.send("Incorrect username or password");
        
    }}
        catch(error){
        console.log(error);
        res.send("wrong details");
        
        }
        
    })
    app.get("/signup", (req,res)=>{
    res.render("signup");
    })
   

// app.get("/student", async (req, res) => {
//     try {
       
//         const regNo = req.session.reg_no;

//         const user = await collection1.findOne({ reg_no: regNo }); // Fetch user details
//         const complaints = await complaint.find({ reg_no: regNo }); // Fetch user's complaints

//         res.render("student", { student: user, complaints: complaints });

//     } catch (error) {
//         console.error(error);
//         res.send("Error fetching complaints");
//     }
// });

    app.get('/warden',function (req,res){
        res.render("warden");
    })
    app.get('/accountant',function (req,res){
        res.render("accountant");
    })

    app.get('/logout', function(req, res) {
        res.render('logout');
    });

    app.post("/signup", async (req, res) => {
        try { 

            const data = new collection1({
                name: req.body.name,
                gender: req.body.gender,
                course: req.body.course,
                year: req.body.year,
                reg_no: req.body.reg_no,
                hostel: req.body.hostel,
                password: req.body.password
            })
     
          const std= await data.save();
             res.status(201).render("login"); 
        } catch (error) {
            console.error(error);
            res.send("Error in signup");
        }
    });

    app.get("/std", (req,res)=>{
        res.render("std")
    })

    app.post("/student",async(req,res)=>{
       try {
            console.log(req.body.complaint);
            const complaintmess= new complaint({  
            category: req.body.category,
            complaint: req.body.complaint,
            status:req.body.status,
            name:req.body.name,
            reg_no:req.body.reg_no
           
        })
        await complaintmess.save();
        const user = await collection1.findOne({reg_no:req.body.reg_no});
        const complaints = await complaint.find();
        res.render('student',{ student: user ,complaints:complaints});
       


    }catch(err){
        console.log(err);
    }  

   
    })
    

    // create server
    app.listen(3000,()=>{
        console.log("server started");
    })
  