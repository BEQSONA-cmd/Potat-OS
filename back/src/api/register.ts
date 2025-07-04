import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { I_user } from "../types";
import User from "../data/models/user";

const MAX_USERNAME_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 50;
const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = 5;

export default async function registerRoutes(fastify: FastifyInstance) {
    fastify.post("/api/register", async (req, res) => {
        const { username, password } = req.body as I_user;

        if (username.length > MAX_USERNAME_LENGTH || username.length < MIN_USERNAME_LENGTH) {
            return res
                .code(400)
                .send({
                    message: `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`,
                });
        }

        if (password.length > MAX_PASSWORD_LENGTH || password.length < MIN_PASSWORD_LENGTH) {
            return res
                .code(400)
                .send({
                    message: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`,
                });
        }

        try {
            const existingUser = await User.findOne({ where: { username } });

            if (existingUser !== null) {
                return res.code(400).send({ message: "Username already exists" });
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            await User.create({
                username,
                password: hashedPassword,
            });


            return res.send({ message: "Registration successful"});
        } catch (error) {
            console.error(error);
            return res.code(500).send({ message: "Internal Server Error" });
        }
    });
}
