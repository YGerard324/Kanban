-- Criar o banco de dados 'kanban'
CREATE DATABASE kanban;

-- Selecionar o banco de dados para uso
USE kanban;

-- Criar a tabela 'user'
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- Criar a tabela 'task'
CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  sector VARCHAR(255) NOT NULL,
  priority ENUM('Baixa', 'Media', 'Alta') NOT NULL,
  status ENUM('A fazer', 'Fazendo', 'Feito') NOT NULL DEFAULT 'A fazer',
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Criar índices ou constraints conforme necessário
CREATE INDEX idx_user_id ON task(user_id);
