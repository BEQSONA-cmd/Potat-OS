import { IContextMenu } from "../../components/contexts/ContextMenuContext";
import { I_File, useFiles } from "../../components/contexts/FileContext";
import { I_Point, useWindows } from "../../components/contexts/WindowContext";

export function ContextMenu({ context }: { context: IContextMenu }) {
    const { addFile, deleteFile, setEditFileId, openFile, fileCount, setFileCount, folderCount, setFolderCount } =
        useFiles();

    const { openWindow } = useWindows();

    const openBackgroundWindow = (position: I_Point) => {
        const file: I_File = {
            id: crypto.randomUUID(),
            name: "Background",
            type: "settings",
            position,
            content: "",
        };
        openWindow(file);
    };

    const addNewFile = (position: I_Point) => {
        let name = "New File";
        setFileCount(fileCount + 1);
        if (fileCount !== 0) {
            name += ` ${fileCount}`;
        }

        const newFile = {
            id: crypto.randomUUID(),
            name,
            type: "file" as const,
            position,
            content: "",
        };
        addFile(newFile);
    };

    const addNewFolder = (position: I_Point) => {
        let name = "New Folder";
        setFolderCount(folderCount + 1);
        if (folderCount !== 0) {
            name += ` ${folderCount}`;
        }
        const newFolder = {
            id: crypto.randomUUID(),
            name,
            type: "directory" as const,
            position,
            content: [],
        };
        addFile(newFolder);
    };

    const handleAction = (action: string) => {
        const position: I_Point = context.position;
        switch (action) {
            case "New File":
                addNewFile(position);
                break;
            case "New Folder":
                addNewFolder(position);
                break;
            case "Delete":
                deleteFile(context.fileId || "");
                break;
            case "Rename":
                setEditFileId(context.fileId || null);
                break;
            case "Open":
                openFile(context.fileId || "");
                break;
            case "Change Background":
                openBackgroundWindow(position);
                break;
            default:
                console.warn(`Unknown action: ${action}`);
                break;
        }
    };

    return (
        <>
            <ul
                className="absolute bg-gray-800 text-sm text-white p-2 rounded shadow"
                style={
                    {
                        top: context.position.y,
                        left: context.position.x,
                        zIndex: 200,
                        width: "170px",
                    } as React.CSSProperties
                }
            >
                {context.actions.map((action: string, index: number) => (
                    <div key={index} className="border-b border-gray-700 last:border-0">
                        <li
                            key={index}
                            className="hover:bg-gray-600 px-2 py-2 cursor-pointer rounded transition-colors"
                            onClick={() => handleAction(action)}
                        >
                            {action}
                        </li>
                    </div>
                ))}
            </ul>
        </>
    );
}
