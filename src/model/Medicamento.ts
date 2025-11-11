import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Medicamento {
  private idMedicamento: number = 0;
  private nome: string;
  private fabricante: string;
  private principioAtivo: string;
  private dataValidade: string;
  private preco: number;

  constructor(
    _nome: string,
    _fabricante: string,
    _principioAtivo: string,
    _dataValidade: string,
    _preco: number
  ) {
    this.nome = _nome;
    this.fabricante = _fabricante;
    this.principioAtivo = _principioAtivo;
    this.dataValidade = _dataValidade;
    this.preco = _preco;
  }

  public getIdMedicamento(): number {
    return this.idMedicamento;
  }

  public setIdMedicamento(idMedicamento: number): void {
    this.idMedicamento = idMedicamento;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getFabricante(): string {
    return this.fabricante;
  }

  public setFabricante(fabricante: string): void {
    this.fabricante = fabricante;
  }

  public getPrincipioAtivo(): string {
    return this.principioAtivo;
  }

  public setPrincipioAtivo(principioAtivo: string): void {
    this.principioAtivo = principioAtivo;
  }

  public getDataValidade(): string {
    return this.dataValidade;
  }

  public setDataValidade(dataValidade: string): void {
    this.dataValidade = dataValidade;
  }

  public getPreco(): number {
    return this.preco;
  }

  public setPreco(preco: number): void {
    this.preco = preco;
  }

  static async listarMedicamentos(): Promise<Array<Medicamento> | null> {
    try {
      const listaMedicamentos: Array<Medicamento> = [];
      const querySelect = `SELECT * FROM medicamentos;`;
      const respostaBD = await database.query(querySelect);

      respostaBD.rows.forEach((medicamentoBD) => {
        const novoMedicamento: Medicamento = new Medicamento(
          medicamentoBD.nome,
          medicamentoBD.fabricante,
          medicamentoBD.principio_ativo,
          medicamentoBD.data_validade,
          medicamentoBD.preco
        );

        novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);
        listaMedicamentos.push(novoMedicamento);
      });

      return listaMedicamentos;
    } catch (error) {
      console.error(`Erro ao listar medicamentos. ${error}`);
      return null;
    }
  }

  static async listarMedicamento(nome: string): Promise<Medicamento | null> {
    try {
      const querySelect = `SELECT * FROM medicamentos WHERE nome = $1;`;
      const respostaBD = await database.query(querySelect, [nome]);

      if (respostaBD.rowCount != 0) {
        const medicamentoBD = respostaBD.rows[0];

        const medicamento: Medicamento = new Medicamento(
          medicamentoBD.nome,
          medicamentoBD.fabricante,
          medicamentoBD.principio_ativo,
          medicamentoBD.data_validade,
          medicamentoBD.preco
        );
        medicamento.setIdMedicamento(medicamentoBD.id_medicamento);

        return medicamento;
      }
      return null;
    } catch (error) {
      console.error(`Erro ao buscar medicamento. ${error}`);
      return null;
    }
  }

  static async listarMedicamentoPrincipioAtivo(
    principioAtivo: string
  ): Promise<Array<Medicamento> | null> {
    try {
      const listaMedicamentos: Array<Medicamento> = [];
      const querySelect = `SELECT * FROM medicamentos WHERE principio_ativo = $1;`;
      const respostaBD = await database.query(querySelect, [principioAtivo]);

      respostaBD.rows.forEach((medicamentoBD) => {
        const novoMedicamento: Medicamento = new Medicamento(
          medicamentoBD.nome,
          medicamentoBD.fabricante,
          medicamentoBD.principio_ativo,
          medicamentoBD.data_validade,
          medicamentoBD.preco
        );

        novoMedicamento.setIdMedicamento(medicamentoBD.id_medicamento);
        listaMedicamentos.push(novoMedicamento);
      });

      return listaMedicamentos.length > 0 ? listaMedicamentos : null;
    } catch (error) {
      console.error(`Erro ao buscar por princípio ativo. ${error}`);
      return null;
    }
  }

  static async cadastrarMedicamento(dados: any): Promise<boolean> {
    try {
      const queryInsert = `
        INSERT INTO medicamentos (nome, fabricante, principio_ativo, validade, preco)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await database.query(queryInsert, [
        dados.nome,
        dados.fabricante,
        dados.principioAtivo,
        dados.dataValidade,
        dados.preco,
      ]);
      return true;
    } catch (error) {
      console.error(`Erro ao cadastrar medicamento. ${error}`);
      return false;
    }
  }
}

export default Medicamento;
