import { useState, useRef, useEffect } from "react";
import { I_File, useFiles } from "../../../components/contexts/FileContext";

export function FileContent({ file }: { file: I_File }) {
    const { updateFileContent } = useFiles();
    const [content, setContent] = useState(file.content as string);
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSave = () => {
        updateFileContent(file.id, content);
        setIsEditing(false);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleClickOutside = (e: MouseEvent) => {
        if (textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
            handleSave();
        }
    };

    useEffect(() => {
        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div onDoubleClick={handleDoubleClick} className="h-full w-full">
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className="w-full h-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSave();
                        }
                    }}
                />
            ) : (
                <pre className="text-white whitespace-pre-wrap h-full w-full overflow-auto p-2">{content}</pre>
            )}
        </div>
    );
}
