const express = require("express");
const router = express.Router();
const { 
  createContact, 
  getContactsByEstadoYDni, 
  getContactByGestionId, 
  updateContact, 
  deleteContact 
} = require("../controller/ContactController");
const { authMiddleware, authorize } = require("../middleware/middleware");


// Crear contacto (solo agentes o supervisores)
router.post("/", authMiddleware, authorize("agente", "supervisor"), createContact);

// Listar contactos por estado y DNI (solo agentes o supervisores)
router.get("/estado/:estado/dni/:dni", authMiddleware, authorize("agente", "supervisor"), getContactsByEstadoYDni);

//Buscar contacto por gestionId (solo agentes o supervisores)
router.get("/:gestionId", authMiddleware, authorize("agente", "supervisor"), getContactByGestionId);

// Actualizar consulta (solo agentes o supervisores)
router.put("/:gestionId", authMiddleware, authorize("agente", "supervisor"), updateContact);

//Eliminar contacto (solo supervisores)
router.delete("/:gestionId", authMiddleware, authorize("supervisor"), deleteContact);

module.exports = router;