const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = mongoose.Schema({
	name:{
		type:String,
		maxlength:50
	},
	email:{
		type:String,
		trim:true,
		unique:1
	},
	password:{
		type:String,
		minlength:5
	},
	lastname:{
		type:String,
		maxlenght:50
	},
	role:{
		type:Number,
		default:0
	},
	token:{
		type:String,
	},
	tokenExp:{
		type:Number
	}
})

userSchema.pre('save',async function save(next){
	var user = this;
	
	if(user.isModified('password')){
		
try{
	const salt = await bcrypt.genSalt(saltRounds);

	user.password = await bcrypt.hash(user.password,salt);
	console.log(salt,"mmm... salty");
	console.log("the salt was logged i think");
	console.log(user.password,"Got the password too i think");
	return next();
}catch(err){
	console.log(err);
	return next(err);
}
		/*//console.log("minshe 1");
		bcrypt.genSalt(saltRounds,function(err,salt){
			//console.log("minshe 2");
			if(err){
			//console.log("err trigured");
				return next(err);}
		})
		//console.log("minshe 3, next line salt incoming");
		//console.log(salt);
 		bcrypt.hash(user.password, salt,function(err,hash){
 			//console.log("Ligbaw , ligebaw new");
			if(err){
				//console.log("Place 6: chigir tefetrual");
				return next(err);}
			//console.log("Place 7: error is passed and we about to hash");
			user.password = hash;
			//Its not working because we didnt do next(), f me malet new, no f the guy who made the video
			next();
			//console.log("Hasdh tedergual ketlo hashu new");
			//console.log(user.password);
		})
	*/}	
	else{
	
		next();
	}

})

const User = mongoose.model("User_mongoose",userSchema);
module.exports = {User};