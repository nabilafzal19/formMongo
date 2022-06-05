const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/authRoutes.js");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose.connect(
  "mongodb+srv://MongoMan:Nhipata11!@cluster0.zfzxg.mongodb.net/auth?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(foodRouter);

app.listen(port, () => {
  console.log("server running at port 3000");
});
