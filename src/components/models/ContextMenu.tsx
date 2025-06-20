import { IContextMenu } from "../contexts/ContextMenuContext";
import { useFiles } from "../contexts/FileContext";

export function ContextMenu({ context }: { context: IContextMenu }) {
    const { addFile, deleteFile, setEditFileId } = useFiles();

    const handleAction = (action: string) => {
        switch (action) {
            case "New File":
                addFile(context.x, context.y, "New File", "file");
                break;
            case "New Folder":
                addFile(context.x, context.y, "New Folder", "directory");
                break;
            case "Delete":
                deleteFile(context.fileId || "");
                break;
            case "Rename":
                setEditFileId(context.fileId || null);
                break;
            default:
                console.warn(`Unknown action: ${action}`);
                break;
        }
    };

    return (
        <ul
            className="absolute bg-gray-800 z-10 text-white p-2 rounded shadow"
            style={{ top: context.y, left: context.x }}
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
