const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  gestionId: { type: String, required: true, unique: true }, // generado automáticamente
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  agente: { type: String, required: true },
  motivo: { type: String, required: true },
  notas: { type: String },
  estado: { 
    type: String, 
    enum: ["pendiente", "solucionado", "derivado"], 
    default: "pendiente" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);