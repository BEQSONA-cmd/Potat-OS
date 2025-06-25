import { IContextMenu } from "../../components/contexts/ContextMenuContext";
import { useFiles } from "../../components/contexts/FileContext";
import { I_Point } from "../../components/contexts/WindowContext";

export function ContextMenu({ context }: { context: IContextMenu }) {
    const { addFile, deleteFile, setEditFileId, openFile } = useFiles();

    const addNewFile = (position: I_Point, name: string) => {
        const newFile = {
            id: crypto.randomUUID(),
            name,
            type: "file" as const,
            position,
            content: "",
        };
        addFile(newFile);
    };

    const addNewFolder = (position: I_Point, name: string) => {
        const newFile = {
            id: crypto.randomUUID(),
            name: "testfile",
            type: "file" as const,
            position,
            content: "testfile",
        };
        const newFolder = {
            id: crypto.randomUUID(),
            name,
            type: "directory" as const,
            position,
            content: [newFile],
        };
        addFile(newFolder);
    };

    const handleAction = (action: string) => {
        const position: I_Point = context.position;
        switch (action) {
            case "New File":
                addNewFile(position, "New File");
                break;
            case "New Folder":
                addNewFolder(position, "New Folder");
                break;
            case "Delete":
                deleteFile(context.fileId || "");
                break;
            case "Rename":
                setEditFileId(context.fileId || null);
                break;
            case "Open":
                openFile(context.fileId || "");
            default:
                console.warn(`Unknown action: ${action}`);
                break;
        }
    };

    return (
        <ul
            className="absolute bg-gray-800 text-white p-2 rounded shadow"
            style={{ top: context.position.y, left: context.position.x, zIndex: 200 } as React.CSSProperties}
        >
            {context.actions.map((action: string, index: number) => (
                <li
                    key={index}
                    className="hover:bg-gray-600 px-2 py-1 cursor-pointer"
                    onClick={() => handleAction(action)}
                >
                    {action}
                </li>
            ))}
        </ul>
    );
}
