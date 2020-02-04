const mongoose = require("mongoose");

const connect = 'mongodb://localhost:27017/bankonline?authSource=admin';
mongoose.connect(connect, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("connected", function () {
  console.log("connected");
});
const Schema = mongoose.Schema;

const account = new mongoose.Schema({
  account_number: Number,
  account_type: String,
  purpose: String,
  money_form: String,
  about: String,
  money: Number,
  balance: Number,
});

let accounts = mongoose.model("account", account);
module.exports = accounts;
