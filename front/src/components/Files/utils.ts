import { I_File } from "../contexts/FileContext";
import { I_Point } from "../contexts/WindowContext";

export function getCloseDirectory(position: I_Point, files: I_File[]): string {
    if (!files) return "";
    let closestDirectoryId = "";
    let closestDistance = Infinity;

    files.forEach((file) => {
        if (file.type === "directory") {
            const distance = Math.sqrt(
                Math.pow(position.x - file.position.x, 2) + Math.pow(position.y - file.position.y, 2)
            );
            if (distance > 50) return;
            if (distance < closestDistance) {
                closestDistance = distance;
                closestDirectoryId = file.id;
            }
        }
    });
    return closestDirectoryId;
}
