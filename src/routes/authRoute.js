const express = require("express");
const { register, login, updateRole, obtenerUsuarios, eliminarUsuario } = require("../controller/authController");
const { authMiddleware, authorize } = require("../middleware/middleware");

const router = express.Router();

// 🔹 Registro de usuarios
router.post("/register", authMiddleware, authorize("supervisor"), register);

// Login
router.post("/login", login);

// Actualizar rol de usuario (solo supervisores)
router.put("/role", authMiddleware, authorize("supervisor"), updateRole);

// Traer todos los usuarios (solo supervisores)
router.get("/users", authMiddleware, authorize("supervisor"), obtenerUsuarios);

// Eliminar usuario (solo supervisores)
router.delete("/users/:userId", authMiddleware, authorize("supervisor"), eliminarUsuario);

module.exports = router;