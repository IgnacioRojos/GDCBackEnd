const mongoose = require("mongoose");

const tipificacionSchema = new mongoose.Schema({
  _id: { type: String, required: true },   // ahora _id = codigo
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Tipificacion", tipificacionSchema);