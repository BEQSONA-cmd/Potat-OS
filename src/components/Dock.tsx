import { TbGridDots } from "react-icons/tb";
import { I_DockApp, useDockApps } from "./contexts/DockContext";

function AppCard({ app }: { app: I_DockApp }) {
    const { currentAppName, setCurrentAppName } = useDockApps();

    const handleClick = () => {
        app.onClick();
        setCurrentAppName(app.name);
    };

    return (
        <div
            className={`flex flex-col items-center group 
        ${currentAppName === app.name ? "p-2 rounded-xl bg-gray-700" : ""}`}
        >
            <button title={app.name} className="text-3xl hover:scale-110 transition-transform" onClick={handleClick}>
                {app.icon}
            </button>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs mt-1 mb-2 bg-black bg-opacity-80 px-2 py-0.5 rounded absolute -translate-y-7 pointer-events-none">
                {app.name}
            </span>
        </div>
    );
}

export default function Dock() {
    const { dockApps } = useDockApps();

    return (
        <div className="p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900  flex items-center gap-6 z-50 text-white rounded-xl border border-gray-700">
            {dockApps.map((app, index) => (
                <AppCard key={index} app={app} />
            ))}
            <div className="h-8 w-px bg-gray-600 mx-2"></div>
            <AppCard
                app={{
                    name: "Apps",
                    icon: <TbGridDots />,
                    onClick: () => console.log("Open Apps Menu"),
                }}
            />
        </div>
    );
}
