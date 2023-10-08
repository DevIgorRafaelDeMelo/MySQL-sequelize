const database = require("../../models");
const Sequelize = require("sequelize");

class PessoasControllers {
  static async pegaTodasPessoas(req, res) {
    try {
      //FindAll() Procura todos os valores da tabela de dados
      const todasPessoas = await database.Elementos.findAll();
      return res.status(200).json(todasPessoas);
    } catch (error) {
      return res.status(500);
    }
  }

  static async pegaTodasPessoasScopes(req, res) {
    try {
      //scope está procurando no arquivo model os valores de definição e definindo o padrão a ser chamado
      const todasPessoas = await database.Elementos.scope("ativo").findAll();
      return res.status(200).json(todasPessoas);
    } catch (error) {
      return res.status(500);
    }
  }

  static async umaPessoa(req, res) {
    const { id } = req.params;
    try {
      //FindOne Procura um valor especifico
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

  // Create Está criando o Obg passando pelo body da req e crinado nodo valor no banco de dados
  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Elementos.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //Update Atualiza os dados que tbm são recolhido no corpo da req e definindo novos valores para o banco
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

  //Destroy o elemento do banco
  static async apagaPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Elementos.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //Está Pegando todas as matriculas pelo ID do estudante
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

  //Está recolhendo do banco os parametros recebidos Pelo Id da matricula e Id do estudante
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

  //Está matriculando o aluno especifico recolhendo req do corpo e ID
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

  //Está atualizando Matricula recencebida pelo Id e IdMatricula
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

  //Deleta matricula Obs: Para saber qual matricula deve ser apagado deve ser passado o Id de qual estudnado deve ser recolido
  static async apagaMatricula(req, res) {
    const { id, idd } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(idd) } });
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //Sequelize em uma manipulação de banco de dados que quando o ele mento for deletado ele não excluis od dados de dados e sim cria uma nova tabela com o valor null e quando
  //excluido ele agrega o valor da data do dia da exclusão e e não retorna esse valor caso a data seja validada o metodo restore volta o valor null retornando os dados
  static async restauraElemento(req, res) {
    const { id } = req.params;
    try {
      await database.Elementos.restore({ where: { id: Number(id) } });
      return res.status(200).json({ message: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatricula(req, res) {
    const { id } = req.params;
    try {
      const matriculas = await database.Elementos.findOne({
        where: { id: Number(id) },
      });
      const matriculasI = await matriculas.getAulasMatriculadas();
      return res.status(200).json(matriculasI);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaMatriculaPorTurma(req, res) {
    const { id } = req.params;
    try {
      const todasMatriculas = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(id),
          status: "confirmado",
        },
        //Limita a quantidade de dados passada
        limit: 20,
        //Ordena a tabela desclarada no primeiro parametro
        order: [["estudante_id", "DESC"]],
      });
      return res.status(200).json(todasMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //Essa funcão está contando dotas as matriculas com o metodo findAndCountAll definindo com parametro confirmado
  //Esse funcão está escrevendo um parametro literal do MySql "codigo de dados" having
  //Deve ser importado O metodo Antes de ser Usado
  static async pegaMatriculaConfirmadasPorTurma(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll({
        where: {
          status: "confirmado",
        },
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: Sequelize.literal(`count(turma_id) >= ${2}`),
      });
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //No caso de queries de SELECT, a ordem lógica é a seguinte:

  //FROM: pega as tabelas onde estão os dados

  //WHERE: filtra os dados

  //GROUP BY: agrega os dados

  //HAVING: filtra os dados agregados

  //SELECT: retorna os resultados

  //ORDER BY: ordena os resultados

  //LIMIT: limita a quantidade de resultados
}

module.exports = PessoasControllers;
