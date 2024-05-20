const mysql=require('mysql');

const xlsx = require('xlsx');


const express= require('express')

const app=express();

app.use(express.json());



const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    port:3306,
    database:'testdb'
});

app.get("/",(req,res)=>{
    res.end("hello")
})

app.get("/details",(req,res)=>{
    res.end("this is details page");
})

app.post('/ExcelIntegration', (req, res) => {
    const jsonData = req.body; // Assuming the Excel sheet sends data in JSON format
  
    // Forward the data to Zapier webhook
    fetch('https://hooks.zapier.com/hooks/catch/18802384/3j117so/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify(jsonData),
      })
    .then(response => {
      if (response.ok) {
        console.log('Data forwarded to Zapier successfully.');
      } else {
        console.error('Failed to forward data to Zapier:', response.statusText);
      }
      res.sendStatus(response.status);
    })
    .catch(error => {
      console.error('Error forwarding data to Zapier:', error.message);
      res.status(500).send('Internal Server Error');
    });
  });


app.get('/getdata',(req,res)=>{
    con.query("Select * from crud_operations",(err,result)=>{
        if(err){
            res.status(400).json({message:err.message})
        }
        res.status(200).json({Response:result});
    })
})

app.post('/addData', (req, res) => {
    const { id, name, email, ph_number, address, birthdate, gender, status,password } = req.body;
    if (name && email && ph_number && address && birthdate && gender && status && password) {
        con.query("INSERT INTO crud_operations (id, name, email, ph_number, address, birthdate, gender, status,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)", [id, name, email, ph_number, address, birthdate, gender, status,password], (err, result) => {
            if (err) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(200).json({ message: "Added successfully" });
            }
        });
    } else {
        res.status(409).json({ message: "All fields required" });
    }
});



app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    const {name,email,ph_number}=req.body
   if(id,name,email,ph_number){
    con.query("SELECT * from crud_operations WHERE id=?",[Number(id)],(err,result)=>{
        if(err){
            res.status(400).json({message:err.message})
        }
        else if(result.length == 0){
            res.status(404).json({message:"id not found"})
        }
        else{
            con.query("update crud_operations set name=?,email=?,ph_number=? where id=?",[name,email,ph_number,id],(err,result)=>{
                if(err){
                    res.status(400).json({message:err.message})
                }
                else{
                    res.status(200).json({message:"update sucessful"});
                }
            })
        }
    })
   }
   else{
    res.status(409).json({message:"All field required"})
   }
})

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id
    if(id){
        con.query("SELECT * FROM crud_operations WHERE id=?",[id],(err,result)=>{
            if(err){
                res.status(500).json({message:err.message})
            }
            else if(result.length == 0){
                res.status(409).json({message:"Id not register"});
            }
            else{
                con.query("DELETE FROM crud_operations WHERE id=?",id,(err,result)=>{
                    if(err){
                        res.status(400).json({message:err.message})
                    }
                    else{
                        res.status(200).json({message:"deleted sucessfully"});
                    }
                })
            }
        })
    }
    else{
        res.status(409).json({message:"Please provide id"});
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(email,password){
        
    }
    else{
        res.status(409).json({message:"Please provide email and password"});
    }
});

app.listen(4002,()=>{
    console.log("server on 4002");
})

module.exports = app;