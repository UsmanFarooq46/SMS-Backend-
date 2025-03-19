const express = require("express");
const app = express();
const morgan = require("morgan");
const errorHandler=require("./src/middleware/custome_error")
const routers = require('./src/api/routers');

//middlewares
app.use(express.json());
app.use(morgan("tiny"));

//Cors
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// port listening
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("running on port 3000");
});

// Accounts Routers
app.get("/", (req, res) => {
  res.send("Welcome to Taiba kids School system");
});

// handle error 
app.use('/api',routers)
app.use(errorHandler)

module.exports = app;
