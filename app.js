const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/home",(req,res)=>{
    res.render("homePage");
})

app.set("view engine","ejs")
app.listen(process.env.PORTNM, () =>
  console.log(`Server is searted on port ${process.env.PORTNM}`)
);