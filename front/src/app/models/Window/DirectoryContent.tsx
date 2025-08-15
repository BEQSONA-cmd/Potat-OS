import { I_File, useFiles } from "@/components/contexts/FileContext";
import NameInput from "@/components/Files/NameInput";
import { getFileIcon } from "@/components/Files/utils";

function FileInDirectory({ file }: { file: I_File }) {
    const { editFileId, openFile } = useFiles();

    function onDoubleClick(e: React.MouseEvent, file: I_File) {
        openFile(file.id);
    }
    const { icon: Icon, color } = getFileIcon(file);
    return (
        <div key={file.id} className="flex flex-col items-center justify-center w-full">
            <div
                onDoubleClick={(e) => onDoubleClick(e, file)}
                className="text-xs font-medium text-white group flex flex-col items-center w-full cursor-pointer p-2 hover:bg-gray-700 rounded transition-colors"
            >
                <Icon size={40} className="text-white transition-colors" style={{ color }} />
                {editFileId === file.id ? (
                    <NameInput file={file} />
                ) : (
                    <span className="mt-1 truncate w-full text-center">{file.name}</span>
                )}
            </div>
        </div>
    );
}

export function DirectoryContent({ file }: { file: I_File }) {
    const { getDirFiles } = useFiles();

    const files = getDirFiles(file);
    return (
        <div>
            {files && (
                <div className="h-full w-full p-4">
                    <div className="grid grid-cols-auto-fill gap-2">
                        {files.map((file) => (
                            <FileInDirectory key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
