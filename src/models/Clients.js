const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // DNI como ID principal
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);