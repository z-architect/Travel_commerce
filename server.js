const express = require("express")
const dbConfig = require("./config/dbConfig")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const {User} = require('./config/dbModel');

app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(dbConfig.url,{useNewUrlParser:true})
		.then(()=>{console.log("succesful DB connection")})
		.catch(err=>{
			console.log("Yhea something went wrong with database")
		})

app.get('/',(req,res)=>{
	res.status(200);
	res.send({name:"itsa working",
			  age:"not sur if thsi gon work"})
    res.send("hello world");
})
app.post('/',(req,res)=>{
	console.log(req.body);
	res.send("got it");
})
app.post('/api/users/register',(req,res)=>{
	const user = new User(req.body);

	user.save((err,userData)=>{
		if(err) return res.json({success: false,err})
	});
	return res.status(200).json({sucess:true});
})

app.listen(5000,()=>{
    console.log("run run run");
})