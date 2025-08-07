const request = require('supertest');
const app = require('../src/app/app');


describe('Auth API', () => {


    it('deve registrar um novo usuário', async () =>  {
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            nome: 'usuario_teste_' + Date.now(),
            email: 'email' + Date.now() + '@teste.com',
            senha: "senha123"
        });
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });


    it('deve retornar erro ao tentar registrar usuário já existente', async () => {
        const user = {
            nome: 'usuario_existente',
            email: 'usuario_existente@teste.com',
            senha: 'senha123'
        };
        
        await request(app)
            .post('/api/auth/register')
            .send(user);

        // Tenta criar novamente
        const res = await request(app)
            .post('/api/auth/register')
            .send(user);


        expect([400, 409]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });

    it('deve fazer login com usuário existente', async () => {
        
        const user = {
            nome: 'usuario_login',
            email: 'usuario_login@teste.com',
            senha: 'senha123'
        };

        await request(app)
            .post('/api/auth/register')
            .send(user);

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                senha: user.senha
            });

        expect(res.statusCode).toBe(200);

        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('refresh');
    });

    it('deve gerar novo token com refresh token válido', async () => {
        
        const user = {
            nome: 'usuario_refresh',
            email: 'usuario_refresh@teste.com',
            senha: 'senha123'
        };

        await request(app)
            .post('/api/auth/register')
            .send(user);

        // Faz login para obter o refresh token
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                senha: user.senha
            });

        expect(loginRes.statusCode).toBe(200);

        const refreshToken = loginRes.body.refresh;
        
        // Testa o endpoint de refresh (corrigido)
        const refreshRes = await request(app)
            .post('/api/auth/token/refresh')
            .send({ refresh: refreshToken });

            
        expect(refreshRes.statusCode).toBe(200);
        expect(refreshRes.body).toHaveProperty('access');
    });
});