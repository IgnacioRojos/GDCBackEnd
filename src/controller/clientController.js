const Client = require("../models/Clients");

// Crear un cliente
const createClient = async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono, email } = req.body;
    const nuevoCliente = new Client({ nombre, apellido, dni, telefono, email });
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar cliente por DNI
const getClientByDni = async (req, res) => {
  try {
    const { dni } = req.params;
    const cliente = await Client.findOne({ dni });
    if (error.code === 11000) {
      return res.status(400).json({ error: "El DNI ya existe en el sistema" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createClient, getClientByDni };