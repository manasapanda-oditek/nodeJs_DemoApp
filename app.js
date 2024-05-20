const express= require('express')

const app=express();

app.use(express.json());

require('dotenv').config();

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to node js")
})

app.get("/details",(req,res)=>{
    res.status(200).send("This is details page");
})

app.get("/about",(req,res)=>{
    res.status(200).send("About page")
})




const port= process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Server is on :",port);
})