const express = require("express");
const router = express.Router();
const { createContact, getContactsByEstado, getContactByGestionId, updateContactEstado, deleteContact } = require("../controller/ContactController");


// POST → Crear contacto
// Ej: POST /api/contactos
router.post("/", createContact);

// GET → Listar contactos por estado
// Ej: GET /api/contactos/estado/solucionado
router.get("/estado/:estado", getContactsByEstado);

// GET → Buscar contacto por gestionId
// Ej: GET /api/contactos/GEST-123456
router.get("/:gestionId", getContactByGestionId);

// PUT → Actualizar estado de un contacto
// Ej: PUT /api/contactos/GEST-123456
router.put("/:gestionId", updateContactEstado);

// DELETE → Eliminar contacto
// Ej: DELETE /api/contactos/GEST-123456
router.delete("/:gestionId", deleteContact);

module.exports = router;