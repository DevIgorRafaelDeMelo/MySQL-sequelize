const { Router } = require("express");
const PessoasControllers = require("../controllers/PassoasControllers");

const router = Router();

router.get("/pessoas", PessoasControllers.pegaTodasPessoas);
router.get("/pessoas/:id", PessoasControllers.umaPessoa);
router.post("/pessoas", PessoasControllers.criaPessoa);
router.put("/pessoas/:id", PessoasControllers.atualizaDados);

module.exports = router;
