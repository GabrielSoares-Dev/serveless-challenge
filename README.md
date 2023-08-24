# Serveless Challenge

Esta é uma API de Gerenciamento de Funcionários construída utilizando o framework NestJS e seguindo a Arquitetura Limpa. A API permite realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) em registros de funcionários.

## Requisitos

- Node.js (versão X.X.X)
- npm ou yarn


## Instalação

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/GabrielSoares-Dev/serveless-challenge.git
cd serveless-challenge
```


2. Instale as dependências do projeto:

```bash
npm i
```

3. Configure as variáveis de ambiente:

Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de acordo com a configuração do seu ambiente.

4. Inicie o servidor:

```bash
npm run start
```

5. Para rodar no modo serverless primeiro configure as credenciais da aws

```bash
serverless config credentials --provider aws --key sua_chave_de_acesso --secret sua_chave_de_acesso_secreta
```

6. Para rodar no modo offline

```bash
serverless offline
```

7. Para realizar o deploy na sua AWS Lambda

```bash
serverless deploy
```


O servidor estará rodando em http://localhost:3000.

## Endpoints

A API possui os seguintes endpoints:

- `POST /v1/employees`: Cria um novo funcionário.
- `GET /v1/employees`: Retorna a lista de funcionários.
- `GET /v1/employees/:id`: Retorna os detalhes de um funcionário específico.
- `PUT /v1/employees/:id`: Atualiza os detalhes de um funcionário.
- `DELETE /v1/employees/:id`: Remove um funcionário.

## Documentação

Você pode encontrar a documentação completa da API no seguinte link do Postman:

[![Executar no Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/12430293/2s9Y5WwNyN#19463831-ce59-4e0b-9ab9-c2846b11aeec)



## Testes

Para executar testes unitários e de integração utilizando o Jest, execute o seguinte comando:

```bash
npm run test
```



## By Gabriel Soares Maciel