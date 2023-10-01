const express = require("express");
const routes = require("./routers");

const app = express();

const port = 3000;

routes(app);

app.listen(port, () => console.log("servidor está rodando !!!"));

module.exports = app;
