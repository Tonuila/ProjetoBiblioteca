# Gerenciamento de Biblioteca

Este é um sistema simples de gerenciamento de biblioteca, onde você pode adicionar, visualizar, editar e excluir livros.

## Funcionalidades

- Adicionar um livro com título, autor e status.
- Visualizar a lista de livros na biblioteca.
- Editar detalhes de um livro existente.
- Excluir um livro da biblioteca.
- Alterar o status de um livro

## Tecnologias Utilizadas

- Java
- Spring Boot
- H2 Database
- HTML, CSS, JavaScript

## Como Executar

Certifique-se de ter o Java e o Maven instalados em seu sistema.

1. Clone este repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Navegue até o diretório do projeto: `cd seu-repositorio`
3. Execute o aplicativo: `mvn spring-boot:run`

O aplicativo estará disponível em `http://localhost:8080`.

## Acesso da API
- Listar todos os livros: `GET http://localhost:8080/api/books`
- Atualizar um livro: `PUT http://localhost:8080/api/books/{id}`
- Alterar o status de um livro: `PUT http://localhost:8080/api/books/{id}/status`
- Excluir um livro: `DELETE http://localhost:8080/api/books/{id}`

## Contribuição

Sinta-se à vontade para contribuir para este projeto. Basta criar um fork e enviar um pull request.

