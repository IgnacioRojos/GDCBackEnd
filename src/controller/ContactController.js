const Contact = require("../models/Contact");
const Client = require("../models/Clients");
const Tipificacion = require("../models/Tipificacion");
const Counter = require("../models/Counter");
const User = require("../models/User"); // 🔹 Modelo de usuarios

// Crear contacto
const createContact = async (req, res) => {
  try {
    const { cliente, agente, motivo, notas, comentario, estado } = req.body;

    // Validar estado
    if (!estado || !["solucionado", "derivado"].includes(estado.toLowerCase())) {
      return res.status(400).json({ message: "El estado debe ser 'solucionado' o 'derivado'" });
    }

    // Validar comentario si el estado es "solucionado"
    if (estado.toLowerCase() === "solucionado" && (!comentario || comentario.trim() === "")) {
      return res.status(400).json({ message: "El comentario es obligatorio cuando el estado es 'solucionado'" });
    }

    // Validar existencia de cliente
    const clienteExistente = await Client.findOne({ dni: cliente });
    if (!clienteExistente) return res.status(404).json({ message: "Cliente no encontrado" });

    // Validar tipificación
    const motivoExistente = await Tipificacion.findOne({ codigo: motivo });
    if (!motivoExistente) return res.status(404).json({ message: "Tipificación no encontrada" });

    // Obtener número de gestión único
    const counter = await Counter.findByIdAndUpdate(
      { _id: "gestionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Crear contacto
    const newContact = new Contact({
      gestionId: counter.seq,
      cliente: clienteExistente.dni,
      agente,
      motivo: motivoExistente.codigo,
      notas,
      comentario,
      estado: estado.toLowerCase()
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);

  } catch (error) {
    console.error("Error al crear contacto:", error);
    res.status(500).json({ message: "Error al crear contacto", error: error.message });
  }
};

// Obtener contactos por estado y dni
const getContactsByEstadoYDni = async (req, res) => {
  try {
    const { estado, dni } = req.params;

    const contactos = await Contact.find({ estado: estado.toLowerCase() })
      .populate({
        path: "cliente",
        match: { dni: dni.toString() },
        select: "nombre apellido dni telefono email"
      })
      .populate("motivo", "codigo descripcion");

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

    if (!contacto) return res.status(404).json({ message: "Consulta no encontrada" });

    res.json(contacto);

  } catch (error) {
    res.status(500).json({ message: "Error al obtener consulta", error });
  }
};

// Actualizar contacto
const updateContact = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const { agente, motivo, notas, comentario, estado } = req.body;

    // Buscar el contacto
    const contacto = await Contact.findOne({ gestionId: Number(gestionId) });
    if (!contacto) return res.status(404).json({ message: "Consulta no encontrada" });

    // Inicializar historial si no existe
    if (!Array.isArray(contacto.historial)) contacto.historial = [];

    // Usuario que hace la modificación (viene de authMiddleware)
    const usuario = req.user;

    // Registrar nueva entrada en el historial
    contacto.historial.push({
      notasAnteriores: contacto.notas || "",
      comentarioAnterior: contacto.comentario || "",
      estadoAnterior: contacto.estado || "",
      fecha: new Date(),
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      rol: usuario.rol
    });

    // Actualizar valores actuales si se enviaron, sino mantener los anteriores
    contacto.agente = agente ?? contacto.agente;
    contacto.motivo = motivo ?? contacto.motivo;
    contacto.notas = notas ?? contacto.notas;
    contacto.comentario = comentario ?? contacto.comentario;
    contacto.estado = estado ?? contacto.estado;

    // Guardar cambios
    await contacto.save();

    // Re-populate relaciones
    await contacto.populate("cliente", "nombre apellido dni telefono email");
    await contacto.populate("motivo", "codigo descripcion");

    // Enviar historial limpio
    const response = contacto.toObject();
    response.historial = response.historial.map(h => ({
      notasAnteriores: h.notasAnteriores,
      comentarioAnterior: h.comentarioAnterior,
      estadoAnterior: h.estadoAnterior,
      fecha: h.fecha,
      usuarioId: h.usuarioId,
      usuarioNombre: h.usuarioNombre,
      rol: h.rol
    }));

    res.json(response);

  } catch (error) {
    console.error("Error al actualizar consulta:", error);
    res.status(500).json({ message: "Error al actualizar consulta", error: error.message });
  }
};




// Eliminar contacto
const deleteContact = async (req, res) => {
  try {
    const { gestionId } = req.params;
    const deleted = await Contact.findOneAndDelete({ gestionId: Number(gestionId) });

    if (!deleted) return res.status(404).json({ message: "Consulta no encontrada" });

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
