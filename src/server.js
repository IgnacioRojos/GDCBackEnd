const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

//rutas 
const clientRoutes = require("./routes/clientRoute");
const contactRoutes = require("./routes/contactRoute");

// Conexión a la base de datos
connectDB();

app.use(express.json());

// Rutas de ejemplo
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando 🚀");
});

//rutas api
app.use("/api/clientes", clientRoutes);
app.use("/api/contactos", contactRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor GESTAR corriendo en puerto http://localhost:${PORT}`);
});