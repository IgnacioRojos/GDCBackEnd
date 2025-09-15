const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  telefono: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Clients", clientSchema);