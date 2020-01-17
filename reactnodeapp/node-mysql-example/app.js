var express = require("express");
var app = express();

var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
const db = require("./app/config/db.config.js");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
});

require("./app/route/employee.route.js")(app);

// Create a Server
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http:", host, port);
});

/*const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const peopleRouter= require("./routes/people")
var app =express();
app.use(bodyParser.json());

app.use("/people",peopleRouter);



app.listen(3001);*/
