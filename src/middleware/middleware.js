const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const usuario = await User.findById(decoded.id).select("username role");
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

    // Guardar usuario en req.user
    req.user = {
      id: usuario._id.toString(),
      nombre: usuario.username || "desconocido",
      rol: usuario.role || "desconocido"
    };

    console.log("Usuario encontrado:", req.user);
    next();
  } catch (error) {
    console.error("Error authMiddleware:", error);
    return res.status(403).json({ message: "Token no válido o expirado" });
  }
};

// Middleware de autorización según roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ message: "Acceso denegado: usuario no definido" });
    }

    const userRole = req.user.rol.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: `Acceso denegado: rol ${req.user.rol}` });
    }

    next();
  };
};

module.exports = { authMiddleware, authorize };