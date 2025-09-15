const Contact = require("../models/Contact");

// Función para generar número de gestión único
function generarNumeroGestion() {
  return "GEST-" + Math.floor(100000 + Math.random() * 900000);
}

// Crear un contacto
const createContact = async (req, res) => {
  try {
    const { cliente, agente, motivo, notas, estado } = req.body;

    const nuevoContacto = new Contact({
      gestionId: generarNumeroGestion(),
      cliente,
      agente,
      motivo,
      notas,
      estado
    });

    await nuevoContacto.save();
    res.status(201).json(nuevoContacto);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El número de gestión ya existe, intente nuevamente" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Listar contactos por estado
const getContactsByEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    const contactos = await Contact.find({ estado }).populate("cliente");
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar contacto por gestionId
const getContactByGestionId = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const contacto = await Contact.findOne({ gestionId }).populate("cliente");
    if (!contacto) return res.status(404).json({ msg: "Gestión no encontrada" });
    res.json(contacto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact, getContactsByEstado, getContactByGestionId };