import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { I_user } from "../types";
import User from "../data/models/user";

const SECRET_KEY: string = process.env.SECRET_KEY as string;

export default async function loginRoutes(fastify: FastifyInstance) {
  fastify.post("/api/login", async (req: FastifyRequest, res: FastifyReply) => {
    const { username, password } = req.body as I_user;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.code(401).send({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ username: user.username }, SECRET_KEY);

      return res.send({ message: "Login successful", token });
    } catch (error) {
      return res.code(500).send({ message: "Internal Server Error" });
    }
  });
}

