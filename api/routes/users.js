const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//! Get all User
router.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({status: "success", "data": allUser});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;