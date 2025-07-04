import { FastifyInstance } from "fastify";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export type FileType = "file" | "directory";

export type ContentType = string | I_File[];

export interface I_Point {
    x: number;
    y: number;
}

export interface I_File {
    id: string;
    name: string;
    type: FileType;
    position: I_Point;
    content: ContentType;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com";
const REPO_OWNER = "BEQSONA-cmd";
let REPO_NAME = "";

function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

async function getFileContents(url: string): Promise<string> {
    try {
        const response = await axios.get(url, {
            headers: {
                Accept: "application/vnd.github.raw",
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching file contents: ${url}`, error);
        return "Unable to fetch file contents";
    }
}

async function fetchRepoContents(path: string = ""): Promise<I_File[]> {
    try {
        const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
        const response = await axios.get(url, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        const contents: I_File[] = await Promise.all(
            response.data.map(async (item: any, index: number) => {
                const newPosition = {
                    x: 50,
                    y: 50,
                };

                if (item.type === "dir") {
                    return {
                        id: generateId(),
                        name: item.name,
                        type: "directory",
                        position: newPosition,
                        content: await fetchRepoContents(item.path),
                    };
                } else {
                    return {
                        id: generateId(),
                        name: item.name,
                        type: "file",
                        position: newPosition,
                        content: await getFileContents(item.download_url),
                    };
                }
            })
        );

        return contents;
    } catch (error) {
        console.error(`Error fetching repository contents: ${path}`, error);
        return [];
    }
}

export default async function getRoutes(fastify: FastifyInstance) {
    fastify.get("/api/get", async (req, res) => {
        const { repoName: repoName } = req.query as { repoName: string };
        if (!repoName) {
            return res.code(400).send({ message: "Repository name is required" });
        }
        REPO_NAME = repoName;

        try {
            const repoContents = await fetchRepoContents("");

            const responseData = {
                id: generateId(),
                name: repoName,
                type: "directory",
                position: { x: 50, y: 50 },
                content: repoContents,
            };

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
