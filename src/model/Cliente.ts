import type { ClienteDTO } from "../interface/ClienteDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Cliente {
  private idClientes: number = 0;
  private nome: string;
  private cpf: string;
  private dataNascimento: Date;
  private telefone: string;
  private email: string;

  constructor(
    nome: string,
    cpf: string,
    data_nascimento: Date,
    telefone: string,
    email: string
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = data_nascimento;
    this.telefone = telefone;
    this.email = email;
  }

  // Getters e Setters
  public getIdCliente(): number {
    return this.idClientes;
  }

  public setIdCliente(idCliente: number): void {
    this.idClientes = idCliente;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getDataNascimento(): Date {
    return this.dataNascimento;
  }

  public setDataNascimento(dataNascimento: Date): void {
    this.dataNascimento = dataNascimento;
  }

  public getTelefone(): string {
    return this.telefone;
  }

  public setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  static async listarClientes(): Promise<Array<Cliente> | null> {
    try {
      let listaDeClientes: Array<Cliente> = [];
      const querySelectClientes = `SELECT * FROM clientes;`;
      const respostaBD = await database.query(querySelectClientes);

      respostaBD.rows.forEach((clienteBD) => {
        const novoCliente: Cliente = new Cliente(
          clienteBD.nome,
          clienteBD.cpf,
          clienteBD.data_nascimento,
          clienteBD.telefone,
          clienteBD.email
        );
        novoCliente.setIdCliente(clienteBD.id_cliente);

        listaDeClientes.push(novoCliente);
      });
      return listaDeClientes;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return null;
    }
  }

  static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean> {
    try {
      const queryInsertCliente = `INSERT INTO clientes (nome, cpf, data_nascimento, telefone, email)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING id_clientes;`;

      const respostaBD = await database.query(queryInsertCliente, [
        cliente.nome.toUpperCase(),
        cliente.cpf,
        cliente.dataNascimento,
        cliente.telefone,
        cliente.email,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Cliente cadastrado com sucesso. ID: ${respostaBD.rows[0].id_clientes}`
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }

  static async listarCliente(cpf: string): Promise<Cliente | null> {
    try {
      const querySelectCliente = `SELECT * FROM clientes WHERE cpf = $1;`;
      const respostaBD = await database.query(querySelectCliente, [cpf]);

      if (respostaBD.rowCount != 0) {
        const cliente: Cliente = new Cliente(
          respostaBD.rows[0].nome,
          respostaBD.rows[0].cpf,
          respostaBD.rows[0].data_nascimento,
          respostaBD.rows[0].telefone,
          respostaBD.rows[0].email
        );
        cliente.setIdCliente(respostaBD.rows[0].id_cliente);

        return cliente;
      }

      return null;
    } catch (error) {
      console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
      return null;
    }
  }
}

export default Cliente;