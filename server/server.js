require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { Connection } = require("./mongo_config/Connection");
const middleware = require("./Autenticacion/middleware");

/**
 * Routers
 */


 const espacios_route = require("../server/routes/espacios.js");
 const pagos_route = require("../server/routes/pagos.js");
 const reservas_route = require("../server/routes/reservas.js");
 const usuarios_route = require("../server/routes/usuarios.js");

var app = express();
const PORT = normalizePort(process.env.PORT || "5000");

app
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())

/**
 * Routes
 */

app.use("/api/espacios", middleware.checkToken, espacios_route);
app.use("/api/pagos", middleware.checkToken, pagos_route);
app.use("/api/reservas", middleware.checkToken, reservas_route);
app.use("/api/usuarios", usuarios_route);


/**
 * Front React
 */
app
  .use(express.static(path.join(__dirname, "../client/build")))
  .get("*", (req, res) => res.sendFile(path.join(__dirname,'../client/build/index.html')));



/**
 * Listen
 */
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  Connection.connectToMongo();
});

/**
 * Get port from environment and store in Express.
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // pipe
  }
  if (port >= 0) {
    return port; // port
  }
  return false;
}



