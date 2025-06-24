import { I_File, useFiles } from "@/components/contexts/FileContext";
import { FaFile, FaFolder } from "react-icons/fa";
import NameInput from "@/components/Files/NameInput";

function DirectoryFiles({ files }: { files: I_File[] }) {
    const { editFileId } = useFiles();

    return (
        <div className="absolute left-0 w-full h-full flex flex-wrap gap-4 p-4">
            {files.map((file) => (
                <div key={file.id}>
                    <div className="flex flex-col text-white cursor-pointer">
                        {file.type === "directory" ? (
                            <FaFolder
                                size={64}
                                className="text-yellow-500 group-hover:text-yellow-400 transition-colors"
                            />
                        ) : (
                            <FaFile size={64} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
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
    );
}

export function DirectoryContent({ file }: { file: I_File }) {
    const { getDirFiles } = useFiles();

    const files = getDirFiles(file);
    return <div>{files && <DirectoryFiles files={files} />}</div>;
}
