const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientSurname: { type: String, required: true },
    patientTc: { type: String, required: true },
  },
);

PatientSchema.set("timestamps", true);

const Patient = mongoose.model("patient", PatientSchema);
module.exports = Patient;
