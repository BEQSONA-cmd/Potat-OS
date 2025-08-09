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

const imgExtensions = ["gif", "png", "svg", "jpg", "jpeg", "webp"];

export function getFileStyle(fileName: string) {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (imgExtensions.includes(ext || "")) {
        return "image";
    } else {
        return "text";
    }
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = "https://api.github.com";
const REPO_OWNER = "BEQSONA-cmd";

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

async function fetchRepoContents(repoName: string, path: string = ""): Promise<I_File[]> {
    try {
        const url = `${GITHUB_API}/repos/${REPO_OWNER}/${repoName}/contents/${path}`;
        const response = await axios.get(url, {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        const contents: I_File[] = await Promise.all(
            response.data.map(async (item: any, index: number) => {
                const newPosition = {
                    x: 0,
                    y: 0,
                };

                if (item.type === "dir") {
                    return {
                        id: generateId(),
                        name: item.name,
                        type: "directory",
                        position: newPosition,
                        content: await fetchRepoContents(repoName, item.path),
                    };
                } else {
                    return {
                        id: generateId(),
                        name: item.name,
                        type: "file",
                        position: newPosition,
                        content:
                            getFileStyle(item.name) === "image"
                                ? item.download_url
                                : await getFileContents(item.download_url),
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

export async function getNewResponseData(repoName: string) {
    const repoContents = await fetchRepoContents(repoName, "");
    const responseData = {
        id: generateId(),
        name: repoName,
        type: "directory",
        position: { x: 10, y: 50 },
        content: repoContents,
    };

    return responseData;
}
