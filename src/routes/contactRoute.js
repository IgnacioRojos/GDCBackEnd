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

// ✅ Todas las rutas requieren autenticación
// POST → Crear contacto (solo agentes o supervisores)
router.post("/", authMiddleware, authorize("agente", "supervisor"), createContact);

// GET → Listar contactos por estado y DNI (solo agentes o supervisores)
router.get("/estado/:estado/dni/:dni", authMiddleware, authorize("agente", "supervisor"), getContactsByEstadoYDni);

// GET → Buscar contacto por gestionId (solo agentes o supervisores)
router.get("/:gestionId", authMiddleware, authorize("agente", "supervisor"), getContactByGestionId);

// PUT → Actualizar consulta (solo agentes o supervisores)
router.put("/:gestionId", authMiddleware, authorize("agente", "supervisor"), updateContact);

// DELETE → Eliminar contacto (solo supervisores)
router.delete("/:gestionId", authMiddleware, authorize("supervisor"), deleteContact);

module.exports = router;