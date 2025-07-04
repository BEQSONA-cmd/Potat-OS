import { FastifyInstance } from 'fastify';
import jwt from "jsonwebtoken";
import { I_user } from '../types';
import User from '../data/models/user';

const SECRET_KEY = process.env.SECRET_KEY as string;

export default async function meRoutes(fastify: FastifyInstance)
{
    fastify.get("/api/me", async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token || token === "undefined") {
            return res.code(401).send({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY) as I_user;
            
            const user = await User.findOne({ where: { username: decoded.username } });
            if(!user) {
                return res.code(401).send({ message: "Invalid Token" });
            }


            return res.send({ user: decoded });
        } catch {
            return res.code(401).send({ message: "Invalid Token" });
        }
    });
}
