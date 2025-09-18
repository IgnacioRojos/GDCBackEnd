const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  gestionId: { type: Number, required: true, unique: true }, // número único
  cliente: { type: String, ref: "Client", required: true }, // referencia al _id del cliente (DNI)
  agente: { type: String, required: true },
  motivo: { type: String, required: true }, // código de tipificación (ej: T001)
  notas: { type: String },
  estado: { 
    type: String, 
    enum: ["pendiente", "solucionado", "derivado"], 
    default: "pendiente" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);