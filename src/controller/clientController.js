const Client = require("../models/Clients");

// Crear un cliente
const createClient = async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono, email } = req.body;

    if (!dni || !nombre || !apellido) {
      return res.status(400).json({ error: "dni, nombre y apellido son requeridos" });
    }

    // Creamos el cliente con _id = dni
    const nuevoCliente = new Client({
      _id: dni,
      dni,
      nombre,
      apellido,
      telefono,
      email
    });

    await nuevoCliente.save();

    res.status(201).json(nuevoCliente);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El DNI ya existe en el sistema" });
    }
    res.status(500).json({ error: error.message });
  }
};


// Buscar cliente por DNI (usando _id directamente)
const getClientByDni = async (req, res) => {
  try {
    const { dni } = req.params;
    const cliente = await Client.findById(dni); 
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createClient, getClientByDni };