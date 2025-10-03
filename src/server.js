const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();

// 🔹 Conexión a la base de datos
connectDB();

// 🔹 Railway usa proxy (necesario para HTTPS y cookies seguras)
app.set("trust proxy", 1);

// 🔹 Configuración CORS
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

// 🔹 Manejar preflight OPTIONS globalmente
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// 🔹 Middleware para JSON
app.use(express.json());

// 🔹 Rutas API
const clientRoutes = require("./routes/clientRoute");
const contactRoutes = require("./routes/contactRoute");
const authRoutes = require("./routes/authRoute");
const tipiRoutes = require("./routes/tipiRoute");

app.use("/api/clientes", clientRoutes);
app.use("/api/contactos", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tipificacion", tipiRoutes);

// 🔹 Ruta test
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando 🚀");
});

// 🔹 Servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor GESTAR corriendo en puerto ${PORT}`);
});

/*const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

const app = express();

// 🔹 Conexión a la base de datos
connectDB();

// 🔹 Configuración CORS
const allowedOrigins = [
  "http://localhost:5173",                // Desarrollo local
  "https://gestarfrontend.netlify.app",   // Producción Netlify
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "El CORS policy no permite este origen.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔹 Responder preflight
app.options("*", cors());

// 🔹 Middleware
app.use(express.json());

// 🔹 Importar rutas
//const clientRoutes = require("./routes/clientRoute");
//const contactRoutes = require("./routes/contactRoute");
//const authRoutes = require("./routes/authRoute");
//const tipiRoutes = require("./routes/tipiRoute");

// 🔹 Ruta test
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando 🚀");
});

// 🔹 Rutas API
//app.use("/api/clientes", clientRoutes);
//app.use("/api/contactos", contactRoutes);
//app.use("/api/auth", authRoutes);
//app.use("/api/tipificacion", tipiRoutes);

// 🔹 Servidor
const PORT = process.env.PORT || 4000; // Railway usa su propio PORT
app.listen(PORT, () => {
  console.log(`🚀 Servidor GESTAR corriendo en puerto ${PORT}`);
});*/