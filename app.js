const express= require('express')

const app=express();

app.use(express.json());

require('dotenv').config();

app.set("view engine","ejs");

app.use(express.static('./public'));

// app.get('/',(req, res)=>{
//   res.send('welcome to home');
// });
app.get('/profile',(req, res)=>{
  res.send('welcome to profile');
});
app.get('/profile/:name',(req, res)=>{
  const uname=req.params.name;
  res.send(`welcome to profile ${uname}`);
});
app.get('/',(req,res)=>{
  res.render("index");
});
app.get('/contact',(req,res)=>{
  // res.send();
  res.render("contact",{Contact: "YOO THE BOY ANGULAR SOMU"});
});
app.get('/details',(req,res)=>{
  res.render("details",{Hover :"manasa panda"});
});


const port= process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Server is on :",port);
})