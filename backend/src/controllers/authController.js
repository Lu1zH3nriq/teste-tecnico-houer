const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/userRepository');


const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

class AuthController {
    async register(req, res) {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                status: 'error',
                message: 'Nome, email e senha são obrigatórios.'
            });
        }
        try {

            const user_existing = await UserRepository.userExists(email);

            if (user_existing) {
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'E-mail já cadastrado.' 
                });
            }

            const user = await UserRepository.createUser(nome, email, senha);

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

            res.json({
                status: 'success',
                message: 'Usuário registrado com sucesso',
                data: { id: user.id, nome: user.nome, email: user.email },
                token
            });

        } catch (err) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }

    async login(req, res) {

        const { email, senha } = req.body;

        if (!email || !senha) {

            return res.status(400).json({ status: 'error', message: 'Email e senha são obrigatórios.' });
        }
        try {

            const user = await UserRepository.userExists(email);

            if (!user) {

                return res.status(401).json({ status: 'error', message: 'Usuário não encontrado!' });
            }

            const valid = await UserRepository.comparePassword(senha, user.passHash);


            if (!valid) {

                return res.status(401).json({ status: 'error', message: 'Senha incorreta!' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

            res.json({
                status: 'success',
                message: 'Login realizado com sucesso',
                data: { id: user.id, nome: user.nome, email: user.email },
                token
            });

        } catch (err) {
            
            res.status(500).json({ status: 'error', message: err.message });
        }
    }
}

module.exports = new AuthController();