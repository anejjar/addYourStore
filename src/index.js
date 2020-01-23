const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//create a server object:
const app = express();
//body parser
app.use(express.json());
//cors
app.use(cors());
// set static folder

// app.use("/", (req, res) => {
// res.send("sdfsd");
// });
app.use("/api/stores", require("../router/StoreRoutes"));
app.use(express.static(path.join("../public")));
//use mongoose
// console.log(__dirname);
mongoose.set("useUnifiedTopology", true);
// mongoose.set("useCreateIndexes", false);
mongoose
  .connect(process.env.CONNECT_DB, { useNewUrlParser: true })
  .then(() => console.log("DB connected!...."))
  .catch(err => console.log(err));
//port
const port = process.env.PORT || 5001;

//listen to port
app.listen(port, () => console.log(`listening to port ${port}`));
