const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const usersCount = await User.countDocuments();

    // Primer usuario: permitir crear supervisor sin token
    if (usersCount === 0 && role === "supervisor") {
      const user = new User({ username, password, role });
      await user.save();
      return res.status(201).json({ message: "Primer supervisor creado", user });
    }

    // Para todos los demás usuarios se necesita token
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "Se requiere token de supervisor" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "supervisor") {
      return res.status(403).json({ message: "Solo supervisores pueden crear usuarios" });
    }

    // Verificar que el username no exista
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ message: "Login exitoso", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar rol de usuario
const updateRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!["agente", "supervisor"].includes(newRole)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    // Verificar token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Se requiere token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "supervisor") {
      return res.status(403).json({ message: "Solo un supervisor puede cambiar roles" });
    }

    let user;

    // Si es un ObjectId válido → buscar por id
    if (mongoose.Types.ObjectId.isValid(userId)) {
      user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
    } else {
      // Si no, buscar por username
      user = await User.findOneAndUpdate({ username: userId }, { role: newRole }, { new: true });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Rol actualizado", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


const obtenerUsuarios = async () => {
  try {
    // Buscamos todos los usuarios, incluyendo password
    const usuarios = await User.find({}, "username role").limit(20);;
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};


module.exports = { register, login , updateRole, obtenerUsuarios};