import { I_File } from "@/components/contexts/FileContext";

export function DirectoryContent({ file }: { file: I_File }) {
    return (
        <div className="text-white">
            <h4 className="font-bold mb-2">Contents:</h4>
            {Array.isArray(file.content) && file.content.length > 0 ? (
                <ul>
                    {file.content.map((item) => (
                        <li key={item.id} className="flex items-center gap-2 py-1">
                            {item.type === "directory" ? (
                                <span className="text-yellow-500">📁</span>
                            ) : (
                                <span className="text-blue-500">📄</span>
                            )}
                            {item.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Empty directory</p>
            )}
        </div>
    );
}