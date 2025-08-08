import { FastifyInstance } from "fastify";
import { getNewResponseData } from "./repos";
import File from "../data/models/files";

export default async function getRoutes(fastify: FastifyInstance) {
  fastify.get("/git/api/get", async (req, res) => {
    const { repoName: repoName } = req.query as { repoName: string };
    if (!repoName) {
      return res.code(400).send({ message: "Repository name is required" });
    }

    try {
      type RepoData = Awaited<ReturnType<typeof getNewResponseData>>;

      let responseData: File | RepoData;

      const existingRepo = await File.findOne({ where: { name: repoName } });

      if (existingRepo) {
        responseData = existingRepo;
      } else {
        const newData = await getNewResponseData(repoName);

        const saved = await File.create({
          name: newData.name,
          type: newData.type,
          position: newData.position,
          content: newData.content,
        });
        responseData = saved;
      }

      const response = {
        message: "Repository fetched successfully",
        timestamp: new Date().toISOString(),
        data: responseData,
      };
      return res.send(response);
    } catch (error) {
      console.error("Error in /api/get:", error);
      return res.code(500).send({ message: "Error fetching repository" });
    }
  });
}
