-- Caso ocorra algum problema no login, executar o código abaixo, para arrumar a senha do usuário root:
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS comerciouniversitario;
CREATE DATABASE IF NOT EXISTS comerciouniversitario DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE comerciouniversitario;

CREATE TABLE produto (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  descricao varchar(200) NOT NULL,
  endereco varchar(100) NOT NULL,
  valor float NOT NULL,
  data datetime NOT NULL,
  PRIMARY KEY (id)
);
