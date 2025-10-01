const express = require("express");
const { register, login, updateRole, obtenerUsuarios } = require("../controller/authController");
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


module.exports = router;