const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // <-- import cors

dotenv.config();

const app = express();

// Conexión a la base de datos
connectDB();

// Configurar CORS
//const allowedOrigins = [
//  "http://localhost:5173",              // desarrollo
  //"https://gestar-frontend.netlify.app" // producción
//];

//app.use(cors({
  //origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, Postman)
    //if(!origin) return callback(null, true);
    //if(allowedOrigins.indexOf(origin) === -1){
      //const msg = 'El CORS policy no permite este origen.';
      //return callback(new Error(msg), false);
   // }
   // return callback(null, true);
  //},
  credentials: true
//}));



// Para desarrollo en localhost
app.use(cors({
  origin: "http://localhost:5173", // tu frontend
  credentials: true // permite enviar cookies o headers de auth
}));

// Si querés permitir cualquier origen (solo pruebas)
// app.use(cors());

app.use(express.json());

// Rutas
const clientRoutes = require("./routes/clientRoute");
const contactRoutes = require("./routes/contactRoute");
const authRoutes = require("./routes/authRoute");
const tipiRoutes = require ("./routes/tipiRoute")

// Rutas de ejemplo
app.get("/", (req, res) => {
  res.send("API GESTAR funcionando 🚀");
});

// Rutas API
app.use("/api/clientes", clientRoutes);
app.use("/api/contactos", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tipificacion", tipiRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor GESTAR corriendo en puerto http://localhost:${PORT}`);
});