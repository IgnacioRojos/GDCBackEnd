const express = require("express");
const { register, login, updateRole } = require("../controller/authController");

const router = express.Router();

// Registro de usuarios
router.post("/register", register); // primer supervisor puede registrarse sin token

// Login
router.post("/login", login);

router.put("/role", updateRole);

module.exports = router;