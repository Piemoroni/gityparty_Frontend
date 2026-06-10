# Gestão de Eventos

Professor, estou em processo para tentar adicionar as imagens, meu computador está dando aquele erro que eu te falei!

## Sobre o Projeto

O **Gestão de Eventos** é uma aplicação web desenvolvida para o gerenciamento de eventos, permitindo cadastrar, visualizar, editar e excluir eventos de forma simples e intuitiva.

O sistema foi construído utilizando uma arquitetura separada entre **Frontend** e **Backend**, garantindo melhor organização, manutenção e escalabilidade do projeto.

---

## Tecnologias Utilizadas

### Frontend
- HTML5
- JavaScript
- Tailwind CSS
- Google Stitch

### Backend
- Node.js
- Express.js
- Prisma ORM

### Banco de Dados
- Prisma Schema
- Banco de dados relacional

---

## Arquitetura do Projeto

O backend foi desenvolvido seguindo uma estrutura organizada utilizando:

### Service Layer
Responsável pelas regras de negócio da aplicação, validações e processamento dos dados antes da comunicação com o banco de dados.

### Prisma Schema
Utilizado para modelagem do banco de dados e gerenciamento das tabelas através do Prisma ORM.

### API REST
Endpoints responsáveis pelas operações de:

- Cadastro de eventos
- Listagem de eventos
- Atualização de eventos
- Exclusão de eventos

---

## Funcionalidades

- Cadastro de eventos
- Listagem de eventos
- Edição de eventos
- Exclusão de eventos
- Controle de status dos eventos
- Visualização da capacidade máxima
- Exibição do próximo evento



---

## Estrutura do Projeto

```text
projeto/

├── frontend/
│   ├── index.html
│   ├── script.js
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── prisma/
│   │   └── schema.prisma
│   └── server.js
│
└── README.md
```

---

## Como Executar

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o banco de dados

```bash
npx prisma migrate dev
```

### 4. Executar o backend

```bash
npm start
```

### 5. Abrir o frontend

Abra o arquivo `index.html` ou execute através de um servidor local.

---

## Objetivo

O objetivo deste projeto é demonstrar a integração entre um frontend moderno e uma API REST desenvolvida com Node.js e Prisma, aplicando conceitos de arquitetura em camadas, manipulação de dados e desenvolvimento full stack.

---

## Desenvolvedora

Projeto desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento web full stack utilizando Node.js, Prisma ORM e Google Stitch Por Pietra Moroni.