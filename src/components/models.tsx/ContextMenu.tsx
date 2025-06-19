import { useStore } from "@/lib/store";

export interface IContextMenu {
    x: number;
    y: number;
    show: boolean;
    actions: string[];
}

export function ContextMenu({ context }: { context: IContextMenu }) {
    const { addFile } = useStore();

    const handleAction = (action: string) => {
        switch (action) {
            case "New File":
                addFile(context.x, context.y, "file");
                break;
            case "New Folder":
                addFile(context.x, context.y, "directory");
                break;
            case "Refresh":
                break;
            case "Settings":
                break;
            case "Exit":
                break;
            default:
                console.warn(`Unknown action: ${action}`);
                break;
        }
    };

    return (
        <ul className="absolute bg-gray-800 text-white p-2 rounded shadow" style={{ top: context.y, left: context.x }}>
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
