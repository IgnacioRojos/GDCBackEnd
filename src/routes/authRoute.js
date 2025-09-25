const express = require("express");
const { register, login } = require("../controller/authController");

const router = express.Router();

// Registro de usuarios
router.post("/register", register); // primer supervisor puede registrarse sin token

// Login
router.post("/login", login);

module.exports = router;