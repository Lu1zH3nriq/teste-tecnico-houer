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


describe('CRUD API /api/operations', () => {
    let token;
    let createdId;
    const baseData = {
        NOMEDEP: 'ESTADUAL - SE',
        DE: 'ADAMANTINA',
        MUN: 'ADAMANTINA',
        DISTR: 'ADAMANTINA',
        CODESC: '31045',
        NOMESC: 'DURVALINO GRION PROF',
        TIPOESC: 8,
        TIPOESC_DESC: 'EE'
    };

    beforeAll(async () => {
        token = await getAuthToken();
    });

    it('deve criar um registro de escola', async () => {
        const res = await request(app)
            .post('/api/operations/create')
            .set('Authorization', `Bearer ${token}`)
            .send(baseData);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'sucess');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        createdId = res.body.data.id;
    });

    it('deve listar registros de escolas (paginado)', async () => {
        const res = await request(app)
            .get('/api/operations/listData?page=1&pageSize=5')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'sucess');
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body).toHaveProperty('pagination');
    });

    it('deve buscar um registro de escola pelo id', async () => {
        const res = await request(app)
            .get(`/api/operations/getById?id=${createdId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'sucess');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id', createdId);
    });

    it('deve atualizar um registro de escola', async () => {
        const res = await request(app)
            .put(`/api/operations/update?id=${createdId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ NOMESC: 'ESCOLA ATUALIZADA' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'sucess');
        expect(res.body.data).toHaveProperty('NOMESC', 'ESCOLA ATUALIZADA');
    });

    it('deve deletar um registro de escola', async () => {
        const res = await request(app)
            .delete(`/api/operations/delete?id=${createdId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'sucess');
        expect(res.body.data).toHaveProperty('id', String(createdId));
    });

    it('deve retornar 404 ao buscar registro deletado', async () => {
        const res = await request(app)
            .get(`/api/operations/getById?id=${createdId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
});
