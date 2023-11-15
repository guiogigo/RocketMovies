const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

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

        const user_email = await knex('users').select('email').where({id});

        if(email !== user_email[0].email) {
            if(old_email === user_email[0].email) {
                await knex('users').update({
                    email,
                }).where({id});
            } else throw new AppError("Email inválido!");
        }

        const user_password = await knex('users').select('password').where({id}).first().password;

        if(password !== user_password) {
            /*if(old_password === user_password) {
                await knex('users').update({
                    password,
                }).where({id});
            } else throw new AppError("Senha inválida!");*/
            throw new AppError("Senha aqui");
        }


        await knex('users').update({
            name,
            email,
            password
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