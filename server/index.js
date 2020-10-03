const express = require("express")
const dbConfig = require("./model/dbConfig")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const {User} = require('./model/dbModel');
const {auth} = require('./middleware/auth');

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
app.get("/api/user/auth",auth,(req,res)=>{
	res.status(200).json({
		_id:req._id,
		isAuth: true,
		email:req.user.email,
		name:req.user.name,
		lastname:req.user.lastname,
		role:req.user.role,
	})
})
app.post('/api/users/register',(req,res)=>{
	const user = new User(req.body);
	console.log(user);

	user.save((err,doc)=>{
		if(err) return res.json({success: false,err});//console.log("something failed");
	return res.status(200).json({sucess:true,userData:doc});
	});
})

app.post('/api/user/login',(req,res)=>{
	//find the email...
	User.findOne({email:req.body.email},(err,user)=>{
		if(!user) return res.json({
			loginSuccess:false,
			message: "Auth failed, email not found"
		});
	//Compare Password
	//console.log(User.comparePasword);
	user.comparePassword(req.body.password,(err,isMatch)=>{
		if(!isMatch){
			return res.json({loginSuccess:false,message:"wrong password"})
		}
	});

	//generate token
	user.generateToken((err,user)=>{
	if(err) return res.status(400).send(err);
	res.cookie("x_auth", user.token).status(200).json({
		loginSuccess: true
	})
	});

	})
})
app.get("/api/user/logout",auth,(req,res)=>{
	User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
		if(err) return res.json({success:false,err})
		return res.status(200).send({
			success:true
		});
	})
})
app.listen(5000,()=>{
    console.log("run run run");
})