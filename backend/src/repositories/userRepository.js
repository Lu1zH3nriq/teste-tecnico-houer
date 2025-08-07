const bcrypt = require('bcryptjs');
const User = require('../models/User');

const UserRepository = {
    async userExists(email) {

        return await User.findOne({ where: { email } });
    },

    async createUser(nome, email, senha) {

        const passHash = await this.hashingPass(senha);

        return await User.create({
            nome,
            email,
            passHash
        });
    },

    async hashingPass(senha) {

        return await bcrypt.hash(senha, 10);
    },


    async comparePassword(senha, passHash) {

        return await bcrypt.compare(senha, passHash);
    }
};

module.exports = UserRepository;