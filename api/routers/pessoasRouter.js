const { Router } = require("express");
const PessoasControllers = require("../controllers/PassoasControllers");

const router = Router();

router.get("/pessoas", PessoasControllers.pegaTodasPessoas);
router.get("/pessoas/:id", PessoasControllers.umaPessoa);
router.post("/pessoas", PessoasControllers.criaPessoa);
router.put("/pessoas/:id", PessoasControllers.atualizaDados);
router.delete("pessoas/:id", PessoasControllers.apagaPessoa);
router.get(
  "/pessoas/:id/matricula/:idd",
  PessoasControllers.umaPessoaMatricula
);
router.get("/pessoas/:id/matricula", PessoasControllers.pegaTodasMatriculas);
router.post("/pessoas/:id/matricula", PessoasControllers.criaMatricula);
router.put("/pessoas/:id/matricula/:idd", PessoasControllers.atualizaMatricula);
router.delete("/pessoas/:id/matricula/:idd", PessoasControllers.apagaMatricula);
module.exports = router;
