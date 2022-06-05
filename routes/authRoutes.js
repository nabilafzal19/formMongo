const express = require("express");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const authModel = require("../models/authModel");
const nodemailer = require("nodemailer");
const { findOne } = require("../models/authModel");
const app = express();

app.get("/", async (request, response) => {
  const users = await authModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nabilafzal22@gmail.com",
    pass: "xxxvggvcybeazarr",
  },
});

app.post("/signup", async (request, response) => {
  const { password, email, firstname } = request.body;

  const existingUser = await authModel.findOne({ email: email });
  //checking for users existance..
  if (existingUser) {
    response.status(404).send("user already exits");
    return;
  }
  //hashing password here

  const salt = bcrypt.genSaltSync(10);
  request.body.password = bcrypt.hashSync(password, salt);

  const user = new authModel(request.body);
  try {
    await user.save();
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
  //welcome mail
  transport
    .sendMail({
      from: "nabilafzal22@gmail.com",
      to: email,
      subject: "welcome message",
      html: `<h1>Welcome Email</h1>
        <h2>Hello ${firstname}</h2>
        <p>WELCOME TO THIS WONDERFUL SITE</p>
        </div>`,
    })
    .catch((err) => console.log(err));
});
// ...
//user signin
app.post("/signin", async (request, response) => {
  const { email, password } = request.body;
  try {
    const account = await authModel.findOne({ email: email });

    if (account && bcrypt.compareSync(password, account.password))
      response.send(`welcome ${account.firstname}`);
    else response.status(404).send("user Does not exits ");
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/forgotPassword", async (request, response) => {
  const { email } = request.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const responseResult = {
      Message: "OTP successfully generated",
      OTP: otp,
      Email: email,
    };

    response.status(200).send(responseResult);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...
// ...

// ...
module.exports = app;
