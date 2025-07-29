const bodyParser = require("body-parser");
const express = require("express");
const mongo = require("mongoose");
const User = require("./userschema");
const event = require("./eventschema");
const { Console } = require("console");
const dotenv = require("dotenv");


dotenv.config();


const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//!DB Cnnection
const DB = process.env.MONGO_URI; //ADD YOUR DB STRING
mongo.connect(DB)
.then(() => console.log("✅ CONNECTION SUCCESSFUL"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));


//!Sign in home
app.get("/", (req, res) => {
  res.render('signin.ejs' )
});

app.get("/resetpassword" , (req,res) => {
  res.render('ResetPassword.ejs');
})



//!Login Page
app.post("/submit", async(req, res) => {
 
  const email  = req.body["email"];
  const password = req.body['password'];
  const usertype = req.body["user-type"];
  console.log(email);
  console.log(usertype);
  const auth = await User.findOne({ email : email , password : password , role : usertype});
  if(!auth){
    res.render("Loginerror.ejs");
  }
  else{
  if(usertype === "organizer"  ){
    res.render("mainpage/MAINPAGE");
  }
  else{
    res.render("participant/home");
    }
  }
});


//!Sign Up
app.get("/signup" , (req,res)  => {
  res.render('signup.ejs');
});

app.post('/register', async(req, res) => {
  const firstName = req.body["fname"];
  const lastName = req.body['lname'];
  const email = req.body['email'];
  const password = req.body['password'];
  const confirmpassword = req.body['confirmpassword'];
  const role = req.body['role'];
  console.log(firstName, lastName, email, password, confirmpassword);
  // Simple validation
  if (password !== confirmpassword) {
      res.render("passwordnotmatch");
  }
  // Unique email
  else{
  const existingUser = await User.findOne({ email });
  if(existingUser) {
     res.render("EmailTaken");
  }
  else{
  const newUser = new User({
    fname: firstName,
    lname: lastName,
    email: email,
    password: password,
    role
  });
 const data =  await newUser.save();
  res.render('registermsg');
}
  }
});


//!live hackathons
app.get('/livehack' , (req,res) => {
  res.render("mainpage/livehackathonsection");
});

//!organize event
app.get('/organizehackathon' , (req,res) => {
  res.render("mainpage/organizeevent");
});


//!Create event and save to DB
app.post('/createevent', async(req, res) => {
  const title = req.body["hackathonTitle"];
  const description = req.body['hackathonDescription'];
  const startdate = req.body['startDate'];
  const lastdate = req.body['endDate'];
  const domain = req.body['hackathondomain'];
  const prize = req.body['prize'];

  const newevent = new event({
     title: title,
     description,
     startdate,
     lastdate,
     domain, 
     prize
  });
 const data =  await newevent.save();
  res.render('EventRegisterPage' , {newevent});
});


//!Participant 

//^ events
app.get('/events' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/event" ,  { events });
});

app.get('/registeredevent' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/registeredevent");
});

app.get('/home' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/home");
});

app.get('/teams' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/team");
});

app.get('/sponsers.html' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/sponsors");
});
app.get('/faqs.html' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/faqs");
});

app.get('/project.html' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/submittedpro");
});

app.get('/syp' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/subyourpro");
});


app.get('/contact-us.html' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("participant/contactus");
});


//!organizer

app.get('/myevents' , async (req,res) => {
  const events = await event.find(); // Fetch all events from MongoDB
  res.render("mainpage/myevents" , { events });
});

app.get('/myusers' , async (req,res) => {
  const users = await User.find({role : "participant"}); // Fetch all events from MongoDB
  res.render("mainpage/myusers" , { users });
});


//!get first page
app.get('/firstpage' ,  (req,res) => {
   // Fetch all events from MongoDB
  res.render("firstpage/firstpage");
});


app.get('/projectsub' ,  (req,res) => {
  // Fetch all events from MongoDB
 res.render("mainpage/projectsub");
});















app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
