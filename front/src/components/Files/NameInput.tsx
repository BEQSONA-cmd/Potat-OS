import { I_File, useFiles } from "../contexts/FileContext";

export default function NameInput({ file }: { file: I_File }) {
    const { renameFile, setEditFileId } = useFiles();
    return (
        <input
            type="text"
            value={file.name}
            autoFocus
            maxLength={25}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => renameFile(file.id, e.target.value)}
            onBlur={() => setEditFileId(null)}
            className="mt-1 w-full text-center bg-transparent focus:outline-none"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    renameFile(file.id, (e.target as HTMLInputElement).value);
                    setEditFileId(null);
                }
            }}
        />
    );
}
