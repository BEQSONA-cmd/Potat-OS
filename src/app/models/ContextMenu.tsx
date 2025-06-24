import { IContextMenu } from "../../components/contexts/ContextMenuContext";
import { useFiles } from "../../components/contexts/FileContext";
import { I_Point } from "../../components/contexts/WindowContext";

export function ContextMenu({ context }: { context: IContextMenu }) {
    const { addFile, deleteFile, setEditFileId, openFile } = useFiles();

    const handleAction = (action: string) => {
        const position: I_Point = context.position;
        switch (action) {
            case "New File":
                addFile(position, "New File", "file");
                break;
            case "New Folder":
                addFile(position, "New Folder", "directory");
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
            className="absolute bg-gray-800 z-10 text-white p-2 rounded shadow"
            style={{ top: context.position.y, left: context.position.x }}
        >
            {context.actions.map((action, index) => (
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
