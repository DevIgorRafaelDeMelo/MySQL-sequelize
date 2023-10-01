const database = require("../../models");

class PessoasControllers {
  static async pegaTodasPessoas(req, res) {
    try {
      const todasPessoas = await database.Elementos.findAll();
      return res.status(200).json(todasPessoas);
    } catch (error) {
      return res.status(500);
    }
  }

  static async umaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoas = await database.Elementos.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(umaPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Elementos.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaDados(req, res) {
    const dados = req.body;
    const { id } = req.params;
    try {
      await database.Elementos.update(dados, {
        where: {
          id: Number(id),
        },
      });
      const pessoaAtualizada = await database.Elementos.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {}
  }
}

module.exports = PessoasControllers;
