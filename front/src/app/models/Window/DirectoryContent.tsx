import { I_File, useFiles } from "@/components/contexts/FileContext";
import { FaFile, FaFolder } from "react-icons/fa";
import NameInput from "@/components/Files/NameInput";

function DirectoryFiles({ files }: { files: I_File[] }) {
    const { editFileId, openFile } = useFiles();

    function onDoubleClick(e: React.MouseEvent, file: I_File) {
        openFile(file.id);
    }

    return (
        <div className="h-full w-full p-4">
            <div className="grid grid-cols-auto-fill gap-2">
                {files.map((file) => (
                    <div key={file.id} className="flex flex-col items-center justify-center w-full">
                        <div
                            onDoubleClick={(e) => onDoubleClick(e, file)}
                            className="text-xs font-medium text-white group flex flex-col items-center w-full cursor-pointer p-2 hover:bg-gray-700 rounded transition-colors"
                        >
                            {file.type === "directory" ? (
                                <FaFolder
                                    size={40}
                                    className="text-yellow-500 group-hover:text-yellow-400 transition-colors"
                                />
                            ) : (
                                <FaFile
                                    size={40}
                                    className="text-blue-500 group-hover:text-blue-400 transition-colors"
                                />
                            )}
                            {editFileId === file.id ? (
                                <NameInput file={file} />
                            ) : (
                                <span className="mt-1 truncate w-full text-center">{file.name}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DirectoryContent({ file }: { file: I_File }) {
    const { getDirFiles } = useFiles();

    const files = getDirFiles(file);
    return <div>{files && <DirectoryFiles files={files} />}</div>;
}
