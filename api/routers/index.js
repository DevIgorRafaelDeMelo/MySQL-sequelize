const bodyParser = require("body-parser");
const pessoas = require("./pessoasRouter");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(pessoas);
  app.use("/", (req, res) => res.send("ola"));
};