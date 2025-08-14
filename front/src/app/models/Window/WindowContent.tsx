import { I_File } from "@/components/contexts/FileContext";
import { FileContent } from "./FileContent";
import BackgroundContent from "./BackgroundContent";
import TerminalContent from "./TerminalContent";
import ProfileContent from "./ProfileContent";
import FirefoxContent from "./FirefoxContent";
import { DirectoryContent } from "./DirectoryContent";
import ProjectContent from "./ProjectContent";

export default function WindowContent({ file }: { file: I_File }) {
    switch (file.type) {
        case "file":
            return <FileContent file={file} />;
        case "settings":
            return <BackgroundContent />;
        case "terminal":
            return <TerminalContent />;
        case "profile":
            return <ProfileContent />;
        case "project":
            return <ProjectContent />;
        case "firefox":
            return <FirefoxContent />;
        default:
            return <DirectoryContent file={file} />;
    }
}
