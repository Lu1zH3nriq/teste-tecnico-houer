const request = require('supertest');
const path = require('path');
const app = require('../src/app/app');

jest.setTimeout(20000);

// obter token de autenticação
async function getAuthToken() {
    const user = {
        nome: 'csv_tester',
        email: 'csv_tester@teste.com',
        senha: 'senha123'
    };
    // Registra usuário (ignora erro se já existir)
    await request(app).post('/api/auth/register').send(user);
    // Faz login
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: user.email, senha: user.senha });
    return res.body.token;
}

describe('CSV Upload API', () => {


    it('deve fazer upload de um arquivo CSV válido', async () => {
        const token = await getAuthToken();
        const res = await request(app)
            .post('/api/data/upload')
            .set('Authorization', `Bearer ${token}`)
            .attach('file', path.resolve(__dirname, '../uploads/cvs_importado_teste.csv'));
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('message');
    });

    it('deve retornar erro se não enviar arquivo', async () => {
        const token = await getAuthToken();
        const res = await request(app)
            .post('/api/data/upload')
            .set('Authorization', `Bearer ${token}`);
        expect([400, 422]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });
    
});
