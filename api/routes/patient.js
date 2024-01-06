const Patient = require("../models/Patient.js");
const express = require("express");
const router = express.Router();

//! get all Patient
router.get("/get-patient", async (req, res) => {
  try {
    const patients = await Patient.find({});
   // res.send({status: "success", "data": patients});
    res.status(200).json(patients);
  } catch (error) {
    console.log(error);
  }
});

//! create
router.post("/add-patient", async (req, res) => {
  try {
    const {patientName, patientSurname, patientTc} = req.body;
    const newPatients = new Patient({patientName, patientSurname, patientTc});
    await newPatients.save();
    res.status(200).json("Patient added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update
router.put("/update-patient", async (req, res) => {
  try {
    await Patient.findOneAndUpdate({_id: req.body.patientTc},req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    console.log(error);
  }
});

//! delete
router.delete("/delete-patient", async (req, res) => {
  try {
    await Patient.findOneAndDelete({_id: req.body.patientId});
    res.status(200).json("Patient deleted successfully.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;