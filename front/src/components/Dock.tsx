import { TbGridDots } from "react-icons/tb";
import { I_DockApp, useDockApps } from "./contexts/DockContext";
import { useWindows } from "./contexts/WindowContext";

function AppCard({ app }: { app: I_DockApp }) {
    const { currentAppName, setCurrentAppName } = useDockApps();
    const { maximizeWindow } = useWindows();

    const handleClick = () => {
        app.onClick();
        setCurrentAppName(app.name);
        maximizeWindow(app.id);
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
                {app.icon}
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
                    id: "apps-menu",
                    name: "Apps",
                    icon: <TbGridDots />,
                    onClick: () => console.log("Open Apps Menu"),
                }}
            />
        </div>
    );
}
