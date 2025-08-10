import { TbGridDots } from "react-icons/tb";
import { I_DockApp, useDockApps } from "./contexts/DockContext";
import { IconType } from "react-icons";
import { useFiles } from "./contexts/FileContext";

function AppCard({ app }: { app: I_DockApp }) {
    const { currentAppName } = useDockApps();
    const { openFile } = useFiles();
    const Icon = app.icon.icon;

    const handleClick = () => {
        openFile(app.id);
    };

    return (
        <div
            className={`flex flex-col items-center group p-2  
        ${currentAppName === app.name ? "rounded-xl bg-gray-700" : ""}`}
        >
            <button
                title={app.name}
                className={`hover:scale-110 transition-transform ${
                    currentAppName === app.name ? "text-4xl" : "text-3xl"
                }`}
                onClick={handleClick}
            >
                <Icon className="text-white" size={30} style={{ color: app.icon.color }} />
            </button>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs mb-3 bg-black bg-opacity-80 px-2 py-0.5 rounded border border-gray-400 absolute -translate-y-7">
                {app.name}
            </span>
        </div>
    );
}

export default function Dock() {
    const { dockApps } = useDockApps();

    return (
        <div className="p-3 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900  flex items-center gap-4 z-50 text-white rounded-xl border border-gray-700">
            {dockApps.map((app, index) => (
                <AppCard key={index} app={app} />
            ))}
            <div className="h-8 w-px bg-gray-600"></div>
            <AppCard
                app={{
                    isDefault: true,
                    id: "apps-menu",
                    name: "Apps",
                    icon: {
                        icon: TbGridDots,
                        color: "white",
                    },
                }}
            />
        </div>
    );
}
