import { useEffect, useRef, useState } from "react";
import { ImTerminal } from "react-icons/im";
import {
    MdWifi,
    MdVolumeUp,
    MdPowerSettingsNew,
    MdSignalWifi4Bar,
    MdSignalWifi3Bar,
    MdSignalWifi2Bar,
    MdPowerOff,
    MdLogout,
    MdRestartAlt,
    MdVolumeDown,
    MdVolumeMute,
} from "react-icons/md";

function WifiMenu() {
    return (
        <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 text-sm rounded-md p-2 w-48 z-50 shadow-lg">
            <h3 className="px-2 py-1 text-gray-400 text-xs font-medium">Wi-Fi Networks</h3>
            <hr className="border-gray-700 my-1" />
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdSignalWifi4Bar />
                <span>PotatoNet</span>
                <span className="ml-auto text-xs text-gray-400">Connected</span>
            </div>
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdSignalWifi3Bar />
                <span>Boil-Fi</span>
            </div>
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdSignalWifi2Bar />
                <span>SpudSpot</span>
            </div>
        </div>
    );
}

function VolumeMenu({ volume, onChange }: { volume: number; onChange: (v: number) => void }) {
    return (
        <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 text-sm rounded-md p-3 w-48 z-50 shadow-lg">
            <div className="flex items-center justify-between mb-2">
                {volume === 0 ? (
                    <MdVolumeMute className="text-l text-gray-400" />
                ) : volume < 50 ? (
                    <MdVolumeDown className="text-l text-gray-400" />
                ) : (
                    <MdVolumeUp className="text-l text-gray-400" />
                )}
                <span className="text-sm text-gray-400">{volume}%</span>
            </div>
            <hr className="border-gray-700  mb-2" />
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
            />
        </div>
    );
}

function PowerMenu() {
    return (
        <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 text-sm rounded-md p-2 w-40 z-50 shadow-lg">
            <h3 className="px-2 py-1 text-gray-400 text-xs font-medium">Power Options</h3>
            <hr className="border-gray-700 my-1" />
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdPowerSettingsNew />
                <span>Power Off</span>
            </div>
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdRestartAlt />
                <span>Restart</span>
            </div>
            <div className="hover:bg-gray-700 px-2 py-2 rounded cursor-pointer flex items-center gap-2">
                <MdLogout />
                <span>Logout</span>
            </div>
        </div>
    );
}

export default function Navbar() {
    const [time, setTime] = useState("");
    const [activeMenu, setActiveMenu] = useState<null | "volume" | "wifi" | "power">(null);
    const [volume, setVolume] = useState(70);

    const wifiRef = useRef<HTMLDivElement>(null);
    const volumeRef = useRef<HTMLDivElement>(null);
    const powerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        };
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (
                (activeMenu === "wifi" && wifiRef.current && !wifiRef.current.contains(target)) ||
                (activeMenu === "volume" && volumeRef.current && !volumeRef.current.contains(target)) ||
                (activeMenu === "power" && powerRef.current && !powerRef.current.contains(target))
            ) {
                setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeMenu]);

    return (
        <div className="absolute top-0 left-0 w-full h-8 bg-black bg-opacity-80 flex items-center justify-between px-4 text-sm z-50 text-white">
            <div className="flex items-center gap-3">
                <ImTerminal className="text-lg text-orange-400" />
                <span className="font-semibold">Potat OS</span>
            </div>

            <div>{time}</div>

            <div className="relative flex gap-4 items-center text-lg">
                <div className="relative" ref={wifiRef}>
                    <MdWifi
                        className="cursor-pointer"
                        onClick={() => setActiveMenu(activeMenu === "wifi" ? null : "wifi")}
                    />
                    {activeMenu === "wifi" && <WifiMenu />}
                </div>

                <div className="relative" ref={volumeRef}>
                    <MdVolumeUp
                        className="cursor-pointer"
                        onClick={() => setActiveMenu(activeMenu === "volume" ? null : "volume")}
                    />
                    {activeMenu === "volume" && <VolumeMenu volume={volume} onChange={setVolume} />}
                </div>

                <div className="relative" ref={powerRef}>
                    <MdPowerSettingsNew
                        className="cursor-pointer"
                        onClick={() => setActiveMenu(activeMenu === "power" ? null : "power")}
                    />
                    {activeMenu === "power" && <PowerMenu />}
                </div>
            </div>
        </div>
    );
}
