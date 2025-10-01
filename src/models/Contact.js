const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  gestionId: { type: Number, required: true, unique: true },
  cliente: { 
    type: String,   // 🔹 usar String en lugar de ObjectId
    ref: "Client", 
    required: true 
  },
  agente: { type: String, required: true },
  motivo: { 
    type: String,   // 🔹 usar String en lugar de ObjectId
    ref: "Tipificacion", 
    required: true 
  },
  notas: { 
    type: String, 
    trim: true
  },
  comentario: {
    type: String, 
    trim: true
  },
  estado: { 
    type: String, 
    enum: ["solucionado", "derivado"], 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);