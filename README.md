# 📞 GDCBackEnd

Backend desarrollado para la **gestión de atención al cliente**, encargado de manejar usuarios, tipificaciones y consultas, conectándose con una base de datos en **MongoDB**
, que cuenta también con un frontend encargado de la interfaz visual y gestión operativa.

---

## 🚀 Descripción general

Este proyecto permite:
- Registrar y autenticar usuarios (supervisores y agentes).
- Administrar **tipificaciones**, que representan los códigos o categorías para identificar los tipos de consultas de los clientes.
- Guardar y consultar los registros de atención de clientes en una base de datos **MongoDB Atlas**.
- Exponer una API REST desarrollada con **Express.js**, pensada para interactuar con un frontend (React, u otra tecnología) mediante peticiones HTTP.

---

## ⚙️ Tecnologías utilizadas

- **Node.js**  
- **Express.js**  
- **MongoDB Atlas** (Base de datos en la nube)  
- **Railway** (Hosting del backend)  
- **Postman** (Pruebas de API)  

---

## 🧠 Estructura principal

El repositorio incluye los siguientes recursos base (almacenados en formato JSON):

- `usuarios.json` → Usuarios del sistema (supervisores, agentes)  
- `clientes.json` → Datos de clientes registrados  
- `tipificaciones.json` → Códigos y categorías de consultas  
- `consultas.json` → Registros de consultas ingresadas  

---

## 🧩 Roles de usuario

- 👨‍💼 **Supervisor** → Gestiona usuarios, visualiza reportes y monitorea consultas.  
- 🧑‍💻 **Agente** → Registra consultas y selecciona una tipificación según el motivo del contacto.

---

## 🔐 Usuario de prueba

Puedes iniciar sesión con los siguientes usuarios de prueba:

```
como supervisor:

USUARIO: ignacio  
CONTRASEÑA: 123456
```
como agente: 

USUARIO: martin
contraseña: Ignacio1920

---

## 🏷️ Tipificaciones disponibles

Las **tipificaciones** son los códigos que identifican el motivo de la consulta de un cliente.  
A continuación se listan las tipificaciones actualmente registradas en la base de datos:

| Código | Descripción                              |
|:-------:|-------------------------------------------|
| 507     | Consulta sobre pago de la tarjeta de crédito |
| 838     | Reclamo por servicio mal cobrado          |
| 1999    | Solicitud de baja                         |
| 1223    | Solicitud de stop debit por fraude         |
| 480     | Consulta por resumen                      |
| 100     | Consulta general del producto             |

---

## 🔗 Conexión con el Frontend

El backend está preparado para conectarse con la aplicación frontend del proyecto **Gestar**.  
🧩 Una vez que el frontend esté en producción, se puede agregar el enlace aquí:

```
🔗 URL del Frontend: [en construcción]
```

---

## 📡 Endpoints principales

A continuación se detallan algunos de los endpoints disponibles para interactuar con la API.

### 👥 Usuarios
| Método | Endpoint           | Descripción                      |
|:-------:|--------------------|----------------------------------|
| `GET`  | `/api/usuarios`    | Obtiene todos los usuarios.      |
| `POST` | `/api/usuarios`    | Crea un nuevo usuario.           |
| `POST` | `/api/login`       | Inicia sesión con credenciales.  |

**Ejemplo (login):**
```bash
POST /api/login
{
  "usuario": "ignacio",
  "password": "123456"
}
```

---

### 🏷️ Tipificaciones
| Método | Endpoint                  | Descripción                            |
|:-------:|---------------------------|----------------------------------------|
| `GET`  | `/api/tipificaciones`     | Lista todas las tipificaciones.        |
| `POST` | `/api/tipificaciones`     | Crea una nueva tipificación.           |

---

### 💬 Consultas
| Método | Endpoint               | Descripción                            |
|:-------:|------------------------|----------------------------------------|
| `GET`  | `/api/consultas`       | Obtiene todas las consultas.           |
| `POST` | `/api/consultas`       | Registra una nueva consulta.           |
| `GET`  | `/api/consultas/:id`   | Obtiene una consulta específica.       |

**Ejemplo (crear una consulta):**
```bash
POST /api/consultas
{
  "cliente": "Juan Pérez",
  "tipificacion": "1999",
  "descripcion": "Deseo dar de baja mi servicio de forma inmediata."
}
```

---

## ⚙️ Instalación y ejecución local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/IgnacioRojos/GestarBackEnd.git
cd GestarBackEnd
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz con los siguientes valores:

```
PORT=4000
MONGODB_URI=<tu_cadena_de_conexion_de_Mongo_Atlas>
```

### 4️⃣ Ejecutar el servidor
```bash
npm start
```

El backend se ejecutará en:  
👉 `http://localhost:4000`

---

## 🧪 Pruebas con Postman

Puedes usar **Postman** para probar los endpoints mencionados.  
El archivo `contact.json` puede contener una colección exportada con ejemplos de peticiones (si se desea incluir).

---

## 🗄️ Base de datos

El proyecto utiliza **MongoDB Atlas** para el almacenamiento de datos.  
Las colecciones principales son:
- `usuarios`
- `clientes`
- `tipificaciones`
- `consultas`

---

## 📤 Despliegue

El backend está desplegado en **Railway**, lo que permite acceder al servicio desde internet.  
URL: https://gestarbackend-production.up.railway.app/

```
🌐 URL del front end: https://sistemadecontacto.netlify.app/
```

---

## 👨‍💻 Autor

Desarrollado por **Ignacio Rojos**  
📧 Contacto: [nachorojos99@gmail.com]

---

## 🧾 Licencia

Este proyecto se distribuye bajo la licencia **MIT**, lo que permite su uso y modificación con fines educativos o comerciales, siempre dando crédito al autor original.

---
