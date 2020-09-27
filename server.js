const express = require("express")
app = express();


app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(5000,()=>{
    console.log("run run run");
})