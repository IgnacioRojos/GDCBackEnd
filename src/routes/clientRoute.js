const express = require("express");
const router = express.Router();
const { createClient, getClientByDni } = require("../controller/clientController");

// POST → Crear cliente
router.post("/", createClient);

// GET → Buscar cliente por DNI
router.get("/:dni", getClientByDni);

module.exports = router;