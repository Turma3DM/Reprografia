const process = require("process");

const express = require("express");
const cors = require("cors");

// Titulo da API
process.title = "Reprographic System";

// Routers
const router = require("./app/routes/index.js");

// var corsOptions = {
//   origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usando rota de Uploads para renderizar as imagens que estão em 
// uploads no diretório da API
app.use("/src/uploads", express.static("src/uploads"));

// Routers
app.use(router);

module.exports = app;