
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

//Set up an Express Router
//var router = express.Router();

//Designate our public folder as a static directory
app.use(express.static("public"));


//Connect Handlebars to our Express app
app.engine("handlebars", exphbs({defaultLayout: "main"}));

app.set("view engine", "handlebars");

//Used to parse JSON and url encoded responses
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//require routes file
require("./config/routes")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
    // Log any errors connection with mongoose
   if (error) {
       console.log(error);
   }

   else {
       console.log("mongoose connection is successful");
   }
});

app.listen(PORT, function() {
 console.log("Listening on port: "+ PORT);
});

