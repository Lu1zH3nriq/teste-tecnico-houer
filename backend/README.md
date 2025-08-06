# Backend API

Este é o backend da aplicação, desenvolvido com Node.js e Express.

## Estrutura de Pastas

- `src/controllers`: Controladores para lógica de negócios.
- `src/models`: Modelos para interação com o banco de dados.
- `src/routes`: Definição de rotas.
- `src/middlewares`: Middlewares personalizados.
- `src/config`: Configurações (ex.: banco de dados, variáveis de ambiente).
- `src/utils`: Funções utilitárias.
- `src/app.js`: Configuração principal do Express.
- `src/server.js`: Inicialização do servidor.
- `tests/`: Testes unitários e de integração.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente no arquivo `.env`.

3. Inicie o servidor:
   ```bash
   npm start
   ```
