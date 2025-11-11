import type { Request, Response } from "express";
import Medicamento from "../model/Medicamento.js";

class MedicamentoController extends Medicamento {
  static async todos(req: Request, res: Response): Promise<Response> {
    try {
      const listaMedicamentos: Array<Medicamento> | null =
        await Medicamento.listarMedicamentos();
      return res.status(200).json(listaMedicamentos);
    } catch (error) {
      console.error(`Erro ao consultar modelo`);
      return res.status(500).json({
        mensagem: "Não foi possivel acessar a lista de medicamentos.",
      });
    }
  }

  static async novo(req: Request, res: Response): Promise<Response> {
    try {
      const dadosRecebidosMedicamento = req.body;
      const respostaModelo = await Medicamento.cadastrarMedicamento(
        dadosRecebidosMedicamento
      );

      if (respostaModelo) {
        return res
          .status(201)
          .json({ mensagem: "Medicamento cadastrado com sucesso." });
      } else {
        return res
          .status(400)
          .json({ mensagem: "Erro ao cadastrar medicamento." });
      }
    } catch (error) {
      console.error(`Erro no modelo. ${error}`);
      return res
        .status(500)
        .json({ mensagem: "Não foi possivel inserir o medicamento." });
    }
  }

  static async nomeMedicamento(req: Request, res: Response): Promise<Response> {
    try {
      const nome = req.params.nome as string;

      if (nome == null) {
        return res.status(400).json({ mensagem: "Nome inválido." });
      }

      const respostaModelo = await Medicamento.listarMedicamento(nome);

      if (respostaModelo == null) {
        return res.status(200).json({
          mensagem: "Nenhum medicamento encontrado com o nome fornecido.",
        });
      }

      return res.status(200).json({ respostaModelo });
    } catch (error) {
      console.error(`Erro ao acessar o modelo. ${error}`);
      return res
        .status(500)
        .json({ mensagem: "Não foi possivel recuperar o medicamento" });
    }
  }

  static async principioMedicamento(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const principioAtivo = req.params.principioAtivo as string;

      if (principioAtivo == null) {
        return res.status(400).json({ mensagem: "Princípio ativo inválido." });
      }

      const respostaModelo = await Medicamento.listarMedicamentoPrincipioAtivo(
        principioAtivo
      );

      if (respostaModelo == null) {
        return res.status(200).json({
          mensagem:
            "Nenhum medicamento encontrado com o princípio ativo fornecido.",
        });
      }

      return res.status(200).json({ respostaModelo });
    } catch (error) {
      console.error(`Erro ao acessar o modelo. ${error}`);
      return res
        .status(500)
        .json({ mensagem: "Não foi possivel recuperar o medicamento" });
    }
  }
}

export default MedicamentoController;
