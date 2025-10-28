const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();

// Conexión a la base de datos
connectDB();

// Railway usa proxy (necesario para HTTPS y cookies seguras)
app.set("trust proxy", 1);

//  Configuración CORS corregida
const allowedOrigins = [
  "http://localhost:5173",              // Desarrollo local
  "https://sistemadecontacto.netlify.app" // Producción (sin barra final)
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware CORS de respaldo para axios/preflight
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json());

// Rutas API
const clientRoutes = require("./routes/clientRoute");
const contactRoutes = require("./routes/contactRoute");
const authRoutes = require("./routes/authRoute");
const tipiRoutes = require("./routes/tipiRoute");

app.use("/api/clientes", clientRoutes);
app.use("/api/contactos", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tipificacion", tipiRoutes);

// Ruta test
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando ");
});

// Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GESTAR corriendo en puerto ${PORT}`);
});
