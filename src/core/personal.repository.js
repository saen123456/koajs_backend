const mongoose = require("mongoose");

const connect = 'mongodb://localhost:27017/bankonline?authSource=admin';
mongoose.connect(connect, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("connected", function () {
  console.log("connected");
});
const Schema = mongoose.Schema;

const personal = new mongoose.Schema({
  id: String,
  firstname: String,
  midname: String,
  lastname: String,
  homephone: String,
  mobilephone: String,
  email: String,
  mailing: String,
  socialsecuritynumber: Number,
  employersname: String,
  employersaddress: String,
  workphone: String,
  job: String,
  balance: Number,
  account_number: Number,

});

let personals = mongoose.model("personal", personal);
module.exports = personals;
