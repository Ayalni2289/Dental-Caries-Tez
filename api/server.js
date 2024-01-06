const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
//router


const imageRoute = require("./routes/images.js");
const patientRoute = require("./routes/patient.js");
const registerRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const Image = require("./models/Image.js");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI2);
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
};

// Server send message
app.get("/", async (req, res) => {
  const data = await Image.find({});
  res.json({
    message: "Images", 
    data: data
  });
});



//milddleware
app.use(express.json({limit : "10mb"}));
app.use(cors());
app.use(logger("dev"));
//

app.use("/api/images", imageRoute);
app.use("/api/patient", patientRoute);
app.use("/api/auth", registerRoute);
app.use("/api/users", usersRoute);

app.listen(port, () => {
  connect();
  console.log(`Server started on port ${port}`);
});
