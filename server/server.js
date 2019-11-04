require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { Connection } = require("./mongo_config/Connection");

/**
 * Routers
 */


//  const login_route = require("../server/routes/index.js");
 const index_route = require("../server/routes/index.js");
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


app.use("/api", index_route);
// app.use("/login", login_route);
// app.use("/registrar", login_route);
app.use("/api/espacios", espacios_route);
app.use("/api/pagos", pagos_route);
app.use("/api/reservas", reservas_route);
app.use("/api/usuarios", usuarios_route);


/**
 * Front React
 */
app
  .use(express.static(path.join(__dirname, "../client/build")))
  .get("/", (req, res) => res.sendFile(path.join(__dirname,'../client/build/index.html')));



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



