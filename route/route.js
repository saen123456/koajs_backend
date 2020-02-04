const mongoose = require("mongoose");
const Route = require('koa-router');
const studentRepository = require('../src/core/student.repository');
const bodyParser = require("koa-bodyparser");
const route = new Route();
const personal = require('../src/core/personal.repository');
const account = require('../src/core/account.repository');
var nodemailer = require('nodemailer');


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

route.post("/register", async ctx => {
  const { body } = ctx.request;
  const account_number = Math.ceil(Math.random() * (999999999999 - 100000000000) + 100000000000);
  body.account_number = account_number
  body.balance = body.money
  await personal.create(body);
  await account.create(body);

  console.log('body :', body)
  console.log(account_number)
  ctx.body = body;

});

/*route.post("/login",async ctx => {
  var otp = Math.ceil(Math.random()*(999999-100000)+100000)
  const {body} = ctx.request;
  //var email = body.email
  var emailreq = body.email
  
  var name = "6006021611216@fitm.kmutnb.ac.th"
  personal.findOneAndUpdate({email:emailreq},{socialsecuritynumber : otp}, 
  function(err, response){
      console.log(response);
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
      //body.socialsecuritynumber=otp
      //ctx.body = body; 
});*/

route.post('/login', async ctx => {
  const { email } = ctx.request.body;
  console.log('email to login : ', email)
  const Data = await sendOTP(email)
  ctx.response.body = Data
})

const sendOTP = async (email) => {
  var otp = Math.ceil(Math.random() * (999999 - 100000) + 100000)
  var name = "6006021611216@fitm.kmutnb.ac.th"
  console.log("otp : " + otp)
  const userData = await personal.findOne({ email: email })
  if (userData !== null) {
    personal.find({ email }, (err, data) => {
      if (err) console.log(err)
      personal.findByIdAndUpdate(data[0]._id, { socialsecuritynumber: otp }, (err2, data2) => {
      })
    })
    var mail = {
      from: name,
      to: email,
      subject: "OTP to connect bank",
      text: "OTP : " + otp
    }
    transporter.sendMail(mail)
    return 'success'
  } else {
    return 'error'
  }
}

// function check otp
route.post('/login/checkotp', async ctx => {
  const { email, otp } = ctx.request.body;
  const userotp = await checkotp(email, otp)
  console.log("Data : ", userotp)
  ctx.response.body = userotp
})

const checkotp = async (email, otp) => {
  console.log("otprequest : ", otp)
  const userData = await personal.findOne({ email: email })
  console.log("userData.socialsecuritynumber : ", userData.socialsecuritynumber)
  console.log("userData : ", userData)


  if (userData != null && userData.socialsecuritynumber == otp) {
    return userData
  } else {
    return 'error'
  }
}

route.post('/tranfer', async ctx => {
  const { email, money_tranfer, email_before } = ctx.request.body;
  const usertranfer = await checktranfer(email, money_tranfer)
  const userbefore = await checkbeforetranfer(email_before, money_tranfer)
  console.log("Data tranfer : ", userbefore)
  //ctx.response.body = usertranfer
  ctx.response.body = userbefore
})
const checkbeforetranfer = async (email, money_tranfer) => {
  console.log("email : ", email)
  console.log("balance : ", money_tranfer)
  const userData = await personal.findOne({ email: email })
  console.log("userData.account_number : ", userData.account_number);
  const moneytranfer = Number(money_tranfer)
  const moneybalance = Number(userData.balance)
  const total = moneybalance - moneytranfer
  console.log("total : ", total);

  if (userData != null) {
    /*personal.find({ email }, (err, data) => {
      if (err) console.log(err)
      personal.findByIdAndUpdate(data[0]._id, { balance: total }, (err2, data2) => {
      })*/
    personal.findOneAndUpdate({ email: email }, { balance: total },
      function (err, response) {
        console.log("response : ", response);
      });
    //})
    console.log("userData : ", userData);
    return userData
  } else {
    return 'error'
  }
}


const checktranfer = async (email, money_tranfer) => {
  console.log("email : ", email)
  console.log("balance : ", money_tranfer)
  const userData = await personal.findOne({ email: email })
  console.log("userData.account_number : ", userData.account_number);
  console.log("userData : ", userData.balance);
  const moneytranfer = Number(money_tranfer)
  const moneybalance = Number(userData.balance)
  const total = moneytranfer + moneybalance

  if (userData != null) {
    personal.find({ email }, (err, data) => {
      if (err) console.log(err)
      personal.findByIdAndUpdate(data[0]._id, { balance: total }, (err2, data2) => {
      })
    })
    return userData
  } else {
    return 'error'
  }
}

module.exports = route;