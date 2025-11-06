CREATE TABLE IF NOT EXISTS clientes (
id_clientes INT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
cpf VARCHAR(11) UNIQUE NOT NULL, 
data_nascimento DATE NOT NULL,
telefone VARCHAR(20) NOT NULL,
email VARCHAR (80)
);

CREATE TABLE medicamentos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  fabricante VARCHAR(100),
  principio_ativo VARCHAR(100),
  validade DATE NOT NULL,
  preco NUMERIC(10,2)
);