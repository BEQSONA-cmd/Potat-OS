import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import testRoutes from "./api/test";
import getRoutes from "./api/get";
import dotenv from "dotenv";
dotenv.config();

const fastify = Fastify();

const HOST: string = process.env.HOST as string;

fastify.register(cors, {
    origin: `${HOST}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});

fastify.register(cookie);
fastify.register(testRoutes);
fastify.register(getRoutes);

const startServer = async () => {
    try {
        await fastify.listen({ port: 8001, host: "0.0.0.0" });
        console.log("Fastify server is running on https://localhost:8001");
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};

startServer();
