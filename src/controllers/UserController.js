const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;

        const createdEmails = await knex('users').select('email')

        //console.log(createdEmails.map)

        if(createdEmails.find(created => created.email === email)) {
            throw new AppError("Email já cadastrado");
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            'password': hashedPassword
        });

        res.json();
    }

    async update(req, res) {
        const { name, email, password, old_email, old_password } = req.body;
        const { id } = req.params;

        if(!email) throw new AppError("Insira um email");
        if(!password) throw new AppError("Insira uma senha");

        const user_email = await knex('users').select('email').where({id}).first();
        const userEmail = user_email.email

        if(email !== userEmail) {
            if(old_email === userEmail) {
                await knex('users').update({
                    email,
                }).where({id});
            } else throw new AppError("Email inválido!");
        }

        const user_password = await knex('users').select('password').where({id}).first();
        const userPassword = user_password.password

        if(password) {
            const hashedPassword = await hash(password, 8);
            if(old_password) {
                const checagemOldPassword = await compare(old_password, userPassword);
                if(checagemOldPassword) {
                    await knex('users').update({
                        'password': hashedPassword,
                    }).where({id});
                } else throw new AppError("Senha inválida!");
            }
        }

        await knex('users').update({
            name,
        }).where({id});

        return res.json();
    }

    async index(req, res) {
        const result = await knex('users');
        return res.json(result);
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex('users').where({ id }).delete();        
        return res.json();
    }
}

module.exports = UserController;