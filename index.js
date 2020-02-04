const bodyParser = require ("koa-bodyparser");
const cors = require("@koa/cors");
const koa = require("koa");
const app = new koa();
const route = require ('./route/route.js');

app.use(bodyParser())

app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id'],
    }),
  )
app.use(route.routes());
  console.log('test');
  const server = app.listen('5000');
/*const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var nodemailer = require('nodemailer');

var cors = require('cors')
const connect = `mongodb://localhost:27017/bankonline?authSource=admin`;
mongoose.connect(connect, { useNewUrlParser: true });

app.use(cors())


var db = mongoose.connection;

db.on("connected", function() {
  console.log("connected");
});

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: 'pipat0909737525@gmail.com',
    pass: 'pipat30042542'
  }
}

var transporter = nodemailer.createTransport(transport)
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

const Schema = mongoose.Schema;

const register_bank = new mongoose.Schema({
  id: String,
  firstname: String,
  midname: String,
  lastname: String,
  homephone: String,
  mobilephone: String,
  email: String,
  mailing: String,
  socialsecuritynumber:String,
  employersname:String,
  employersaddress:String,
  workphone:String,
  job:String,
  account_number:Number,
  
});
const accout_bank = new mongoose.Schema({
  account_number: Number,
  account_type: String,
  purpose : String,
  money_form: String,
  about:String,
  money:Number,
  balance:Number,
});
let register_banks = mongoose.model("register", register_bank);
let accout_banks = mongoose.model("account", accout_bank);

app.use(bodyParser.json());
app.post("/register",async (req, res) => {
  //console.log(req.body.email)
  register_banks.find({email:req.body.email},(err , data) =>{
      if(data.length!==0) res.send(req.body)
      else {
       
        const account_number=Math.ceil(Math.random()*(999999999999-100000000000)+100000000000);
        register_banks.create(req.body);
         accout_banks.create(req.body);
        res.json({"account_number":account_number})
      } 
  })    
});

app.post("/login",async (req, res) => {
 
  //const {body} = ctx.request;
  //var email = body.email
  var emailreq = req.body.email
  var name = "pipat0909737525@gmail.com"
  var otp = Math.ceil(Math.random()*(999999-100000)+100000)
  var check=false
  register_banks.find({ email:req.body.email},(err,data) =>{
  register_banks.findByIdAndUpdate(data[0]._id,{socialsecuritynumber:otp},(dataotp) => { });
  //register_banks.findOneAndUpdate(data[0]._id, {socialsecuritynumber:otp});

  });
  //var otptest = 5555;
  //console.log(otptest)
  //console.log(body.email) 
        var mail = {
        from: name,
        to: emailreq,
        subject: "OTP bank",
        text: "OTP : "+otp
        }
     console.log("otp : "+otp)
      transporter.sendMail(mail)
});

app.post("/login/checkotp", async (req, res) => {
 
  var otptest=req.body.otp
  var check=false
      console.log("otp : "+otptest)
      register_banks.find({email:req.body.email},(err , data_otp) =>{
    if(data_otp[0].socialsecuritynumber==otptest){
      check=true
      //console.log("test : "+test)
      console.log('success')
      
      res.send({check})
    }
    else{
      check=false
      console.log('wrong otp')
      //res.json("wrong otp");
      /*res.json({
        msg: 'success'
      })
      res.send({check})
    }
  })
  });*/
app.listen(3333);
