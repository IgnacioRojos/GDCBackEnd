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

// Configuración CORS
const allowedOrigins = [
  "http://localhost:5173",                // Desarrollo local
  "https://gestarfrontend.netlify.app",   // Producción Netlify
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman, curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("El CORS policy no permite este origen."), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Manejar preflight OPTIONS globalmente
app.options("*", (req, res) => {
  res.sendStatus(200);
});

//Middleware para JSON
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

//Ruta test
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando 🚀");
});

//Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor GESTAR corriendo en puerto ${PORT}`);
});

