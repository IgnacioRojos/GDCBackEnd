const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  gestionId: { type: Number, required: true, unique: true },

  cliente: { type: String, ref: "Client", required: true },
  agente: { type: String, required: true },
  motivo: { type: String, ref: "Tipificacion", required: true },

  notas: { type: String, trim: true },
  comentario: { type: String, trim: true },

  estado: { type: String, enum: ["solucionado", "derivado"], required: true },


  historial: [
    {
      notasAnteriores: String,
      comentarioAnterior: String,
      estadoAnterior: String,
      fecha: { type: Date, default: Date.now },
      usuarioId: String,       // id del usuario que modificó
      usuarioNombre: String,   // nombre del usuario
      rol: String              // rol del usuario
    },
  ]
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);

