const express = require("express");
const app = express();
app.use(express.json());

let users = [];

app.post("/signup", (req,res)=>{
  users.push(req.body);
  res.send("User saved");
});

app.get("/users",(req,res)=>{
  res.json(users);
});

app.listen(3000, ()=>console.log("Server running"));