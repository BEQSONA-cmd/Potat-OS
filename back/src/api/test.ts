import { FastifyInstance } from "fastify";

export default async function testRoutes(fastify: FastifyInstance) {
    fastify.get("/api/test", async (req, res) => {
        try {
            const response = {
                message: "Test endpoint is working",
                timestamp: new Date().toISOString(),
            };
            return res.send(response);
        } catch {
            return res.code(401).send({ message: "Invalid Token" });
        }
    });
}
