const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Usamos el dni como _id
  dni: { type: String, required: true },  // agregamos dni
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String },
  email: { type: String }
}, { timestamps: true });

// Antes de guardar, seteamos _id = dni automáticamente
clientSchema.pre("save", function(next) {
  if (!this._id) {
    this._id = this.dni;
  }
  next();
});

module.exports = mongoose.model("Client", clientSchema);