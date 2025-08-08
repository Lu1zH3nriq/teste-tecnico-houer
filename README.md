# teste-tecnico-houer

# Desafio Fullstack – Instalações Escolares

## Descrição
Aplicação fullstack para gestão de instalações escolares, com upload de CSV, CRUD de escolas e autenticação JWT. O projeto é dividido em backend (Node.js/Express) e frontend (React), utilizando banco de dados PostgreSQL hospedado na Aiven.

## Tecnologias
- Backend: Node.js + Express
- Frontend: React
- Banco de Dados: PostgreSQL (Aiven, mas pode ser local)
- Autenticação: JWT (JSON Web Token)
- ORM: Sequelize
- Upload de arquivos: Multer
- Documentação de API: Swagger
- Deploy: Azure Web Apps (frontend e backend separados)

## Estrutura do Projeto
```
├── backend/        # API Node.js/Express
│   ├── src/
│   ├── .env
│   └── ...
├── frontend/       # Aplicação React
│   ├── src/
│   ├── .env
│   └── ...
├── docker-compose.yml
├── README.md
└── ...
```

## Autenticação JWT
- Backend:
  - Ao fazer login, o backend gera um token JWT assinado e retorna ao frontend.
  - As rotas protegidas exigem o envio do token no header Authorization (Bearer).
  - O backend valida o token em cada requisição protegida.
- Frontend:
  - O token JWT é salvo no localStorage/sessionStorage após login.
  - O token é enviado automaticamente nas requisições autenticadas.
  - O estado de autenticação é controlado via Context API.

## Variáveis de Ambiente
- Backend (`backend/.env`):
  - PORT – Porta do servidor backend
  - DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME – Configurações do PostgreSQL (Aiven ou local)
  - Exemplo:
    ```env
    PORT=3333
    DB_HOST=db-postgresql-teste-pratico-houer-dp-teste-pratico-houer.d.aivencloud.com
    DB_PORT=17228
    DB_USER=avnadmin
    DB_PASS=AVNS_lQU1BzuZocWJyrbpkIW
    DB_NAME=infraEscolarDB
    ```
- Frontend (`frontend/.env`):
  - REACT_APP_API_URL – URL da API backend (ex: http://localhost:3333 ou https://api-teste-houer.azurewebsites.net)
  - Exemplo:
    ```env
    REACT_APP_API_URL=http://localhost:3333
    ```

## Banco de Dados
- Utiliza PostgreSQL hospedado na Aiven.
- Se desejar rodar localmente, basta alterar as variáveis de ambiente do backend para apontar para seu PostgreSQL local.

## Como Executar Localmente
### 1. Clone o repositório
```bash
git clone https://github.com/Lu1zH3nriq/teste-tecnico-houer.git
cd teste-tecnico-houer
```
### 2. Backend
```bash
cd backend
npm install
# Configure o arquivo .env conforme exemplo acima
npm run dev
```
### 3. Frontend
```bash
cd frontend
npm install
# Configure o arquivo .env conforme exemplo acima
npm start
```
### 4. Acesse
- Frontend: http://localhost:3000
- Backend: http://localhost:3333

## Executando com Docker Compose
Na raiz do projeto, rode:
```bash
docker-compose up --build
```
Isso irá subir backend, frontend e banco de dados (caso configurado no compose) juntos.

## Funcionalidades
- Upload de CSV de dependências escolares
- CRUD completo de escolas
- Autenticação de usuários (JWT)
- Listagem, edição e exclusão de registros
- Documentação da API via Swagger (backend)

## Usuário de teste
- Login: admin@teste.com
- Senha: 123456