require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ---------------- MODELOS ----------------
const Client = require("./models/Clients");
const Tipificacion = require("./models/Tipificacion");
const Contact = require("./models/Contact");
const Counter = require("./models/Counter");

// ---------------- SCRIPT ----------------
(async () => {
  try {
    // Conexión a Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB Atlas");

    // Rutas relativas de los JSON
    const clientesPath = path.join(__dirname, "data/clients.json");
    const tipificacionesPath = path.join(__dirname, "data/tipificaciones.json");
    const contactosPath = path.join(__dirname, "data/contact.json");

    // ---------------- CLIENTES ----------------
    const clientesData = JSON.parse(fs.readFileSync(clientesPath, "utf-8"));
    for (const cliente of clientesData) {
      if (!cliente.dni) cliente.dni = cliente._id; // asegurar dni = _id
      const exists = await Client.findById(cliente._id);
      if (!exists) {
        await Client.create(cliente);
        console.log(`Cliente ${cliente._id} migrado`);
      } else {
        console.log(`Cliente ${cliente._id} ya existe`);
      }
    }

    // ---------------- TIPIFICACIONES ----------------
    const tipificacionesData = JSON.parse(fs.readFileSync(tipificacionesPath, "utf-8"));

    for (const tip of tipificacionesData) {
        // si no hay codigo, usamos _id
        if (!tip.codigo) tip.codigo = tip._id;

        // Validamos que descripcion exista
        if (!tip.descripcion) {
            console.warn(`Tipificación inválida, se omite: ${JSON.stringify(tip)}`);
            continue; // salta este registro
        }

        const exists = await Tipificacion.findOne({ codigo: tip.codigo });
        if (!exists) {
            await Tipificacion.create(tip);
            console.log(`Tipificación ${tip.codigo} migrada`);
        } else {
            console.log(`Tipificación ${tip.codigo} ya existe`);
        }
    }
    // ---------------- CONTACTOS ----------------
    if (fs.existsSync(contactosPath)) {
      const contactosData = JSON.parse(fs.readFileSync(contactosPath, "utf-8"));
      for (const contacto of contactosData) {
        // aseguramos que cliente y motivo existan como strings
        if (typeof contacto.cliente !== "string") contacto.cliente = contacto.cliente.toString();
        if (typeof contacto.motivo !== "string") contacto.motivo = contacto.motivo.toString();

        const exists = await Contact.findOne({ gestionId: contacto.gestionId });
        if (!exists) {
          await Contact.create(contacto);
          console.log(`Contacto ${contacto.gestionId} migrado`);
        } else {
          console.log(`Contacto ${contacto.gestionId} ya existe`);
        }
      }
    }

    // ---------------- COUNTERS ----------------
    const counters = [
      { _id: "contactoId", seq: 0 },
      { _id: "gestionId", seq: 0 }
    ];
    for (const counter of counters) {
      const exists = await Counter.findById(counter._id);
      if (!exists) {
        await Counter.create(counter);
        console.log(`Counter ${counter._id} inicializado`);
      } else {
        console.log(`Counter ${counter._id} ya existe`);
      }
    }

    console.log("Migración completa a Atlas");
    process.exit();
  } catch (error) {
    console.error("Error migración:", error);
    process.exit(1);
  }
})();
