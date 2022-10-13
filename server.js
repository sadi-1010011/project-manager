const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// ROUTES
const currentRoute = require('./routes/currentRoute');
const completeRoute = require('./routes/completeRoute');
const comingRoute = require('./routes/comingRoute');
const projectsRoute = require('./routes/projectRoute');
const noPage = require('./routes/noPage');


// MIDDLEWARES
app.use(cors());
app.use(express.json());


// SETUP
const PORT = process.env.PORT || 5000;

// CONNECT DB - username: sadi, password: p7RTpegZrX7Fl4HH
const username = "sadi";
const password = "p7RTpegZrX7Fl4HH";
const cluster = "cluster0.xe6l4";
const dbname = "projectsDB";


// DATABASE
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log( 'DB Connected' ))
.catch(err => console.log( 'cannot connect DB: ')); // log err for debugging
// mongoose.connect("mongodb+srv://sadi:p7RTpegZrX7Fl4HH@cluster0.xe6l4.mongodb.net/projectsDB") try this


// ENDPOINTS
app.use("/", currentRoute); // homepage is current page
app.use("/projects", projectsRoute);
app.use("/current", currentRoute);
app.use("/complete", completeRoute);
app.use("/coming", comingRoute);
app.use("*", noPage); // 404 


// SERVER
app.listen(PORT, () => console.log("server is running on PORT:", PORT));