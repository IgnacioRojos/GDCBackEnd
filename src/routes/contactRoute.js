const express = require("express");
const router = express.Router();
const { createContact, getContactsByEstado, getContactByGestionId } = require("../controller/ContactController");

// POST → Crear contacto
router.post("/", createContact);

// GET → Listar contactos por estado (ej: /api/contactos/estado/solucionado)
router.get("/estado/:estado", getContactsByEstado);

// GET → Buscar contacto por gestionId (ej: /api/contactos/GEST-123456)
router.get("/:gestionId", getContactByGestionId);

module.exports = router;