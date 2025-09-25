const Contact = require("../models/Contact");
const Client = require("../models/Clients");
const Tipificacion = require("../models/Tipificacion");
const Counter = require("../models/Counter");

// Crear un contacto con gestionId único automático
const createContact = async (req, res) => {
  try {
    const { cliente, agente, motivo, notas, estado } = req.body;

    // Validar estado explícitamente
    if (!estado || !["solucionado", "derivado"].includes(estado.toLowerCase())) {
      return res.status(400).json({ message: "El estado debe ser 'solucionado' o 'derivado'" });
    }

    // Validar existencia de cliente por DNI
    const clienteExistente = await Client.findOne({ dni: cliente });
    if (!clienteExistente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Validar existencia de tipificación por código
    const motivoExistente = await Tipificacion.findOne({ codigo: motivo });
    if (!motivoExistente) {
      return res.status(404).json({ message: "Tipificación no encontrada" });
    }

    // Obtener número de gestión único desde Counter
    const counter = await Counter.findByIdAndUpdate(
      { _id: "gestionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Crear contacto con dni y codigo en lugar de ObjectId
    const newContact = new Contact({
      gestionId: counter.seq,
      cliente: clienteExistente.dni,      // 🔹 guardamos DNI
      agente,
      motivo: motivoExistente.codigo,     // 🔹 guardamos código
      notas,
      estado: estado.toLowerCase()
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);

  } catch (error) {
    res.status(500).json({ message: "Error al crear contacto", error });
  }
};

const getContactsByEstadoYDni = async (req, res) => {
  try {
    const { estado, dni } = req.params;

    const contactos = await Contact.find({ estado: estado.toLowerCase() })
      .populate({
        path: "cliente",
        match: { dni: dni.toString() },  // 🔹 filtramos por dni dentro del cliente
        select: "nombre apellido dni telefono email"
      })
      .populate("motivo", "codigo descripcion");

    // Filtrar los que realmente tengan cliente (porque match puede dejar null)
    const filtrados = contactos.filter(c => c.cliente !== null);

    res.json(filtrados);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar contactos", error });
  }
};

// Obtener consulta por gestionId
const getContactByGestionId = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const contacto = await Contact.findOne({ gestionId: Number(gestionId) })
      .populate("cliente", "nombre apellido dni telefono email")
      .populate("motivo", "codigo descripcion");

    if (!contacto) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }

    res.json(contacto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener consulta", error });
  }
};

// Actualizar consulta
const updateContact = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const { agente, motivo, notas, estado } = req.body;

    const contacto = await Contact.findOneAndUpdate(
      { gestionId: Number(gestionId) },
      { agente, motivo, notas, estado },
      { new: true }
    )
      .populate("cliente", "nombre apellido dni telefono email")
      .populate("motivo", "codigo descripcion");

    if (!contacto) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }

    res.json(contacto);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar consulta", error });
  }
};

// Eliminar consulta
const deleteContact = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const deleted = await Contact.findOneAndDelete({ gestionId: Number(gestionId) });

    if (!deleted) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }

    res.json({ message: "Consulta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar consulta", error });
  }
};

module.exports = {
  createContact,
  getContactsByEstadoYDni,
  getContactByGestionId,
  updateContact,
  deleteContact
};