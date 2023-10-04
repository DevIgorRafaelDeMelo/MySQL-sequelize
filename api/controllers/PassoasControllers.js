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

  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Elementos.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaTodasMatriculas(req, res) {
    const { id } = req.params;
    try {
      const todasMatriculas = await database.Matriculas.findAll({
        where: { estudante_id: Number(id) },
      });
      return res.status(200).json(todasMatriculas);
    } catch (error) {
      return res.status(500);
    }
  }

  static async umaPessoaMatricula(req, res) {
    const { id, idd } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(idd),
          estudante_id: Number(id),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { id } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(id) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const dados = req.body;
    const { id, idd } = req.params;
    try {
      await database.Matriculas.update(dados, {
        where: {
          id: Number(idd),
          estudante_id: Number(id),
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(idd),
        },
      });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {}
  }

  static async apagaMatricula(req, res) {
    const { id, idd } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(idd) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoasControllers;
