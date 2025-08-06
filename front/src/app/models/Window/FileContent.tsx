import { useState, useRef, useEffect } from "react";
import { I_File, useFiles } from "../../../components/contexts/FileContext";
import { getFileStyle } from "@/components/Files/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import "github-markdown-css";

const CodeBlock = ({ language, value }: { language: string | null; value: string }) => {
    return (
        <SyntaxHighlighter
            language={language || "text"}
            style={atomDark}
            showLineNumbers={true}
            customStyle={{
                margin: 0,
                padding: "1rem",
                backgroundColor: "#1e1e1e",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
            }}
        >
            {value}
        </SyntaxHighlighter>
    );
};

function ContentCard({ content, style, language }: { content: string; style: string; language?: string }) {
    return (
        <div className="h-full w-full overflow-auto">
            {style === "basic" ? (
                <pre className="text-white whitespace-pre-wrap p-4">{content}</pre>
            ) : style === "readme" ? (
                <div className="markdown-body p-4 rounded">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
            ) : language ? (
                <CodeBlock language={language} value={content} />
            ) : (
                <pre className="text-white whitespace-pre-wrap p-4">{content}</pre>
            )}
        </div>
    );
}

export function FileContent({ file }: { file: I_File }) {
    const { updateFileContent } = useFiles();
    const [content, setContent] = useState(file.content as string);
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { style, language } = getFileStyle(file.name);

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
        <div onDoubleClick={handleDoubleClick} className="p-4 h-full w-full">
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className="w-full h-full bg-gray-700 text-white p-4 rounded focus:outline-none font-mono"
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
                <ContentCard content={content} style={style} language={language} />
            )}
        </div>
    );
}
