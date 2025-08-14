"use client";
import React, { useState } from "react";
import CodeSkills from "@/components/Profile/CodeSkills";
import EducationList from "@/components/Profile/EducationList";
import ContactList from "@/components/Profile/ContactList";
import { FaUser, FaCode, FaGraduationCap, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

const user = {
    name: "Beqa",
    surname: "Tvildiani",
    bio: "Software Developer",
};

type ArchiveTab = "skills" | "education" | "contact";

type TabsProps = {
    activeTab: ArchiveTab;
    setActiveTab: React.Dispatch<React.SetStateAction<ArchiveTab>>;
};

function Tabs({ activeTab, setActiveTab }: TabsProps) {
    const tabs: { id: ArchiveTab; label: string; icon: IconType }[] = [
        { id: "skills", label: "Skills", icon: FaCode },
        { id: "education", label: "Education", icon: FaGraduationCap },
        { id: "contact", label: "Contact", icon: FaEnvelope },
    ];

    return (
        <div className="flex gap-1 sm:gap-2 bg-gray-800/50 p-1 sm:p-1.5 rounded-xl border border-gray-700">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`relative px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-2 rounded-lg font-medium transition-all flex items-center gap-1 sm:gap-2 whitespace-nowrap
                            ${
                                activeTab === tab.id
                                    ? "text-white bg-gradient-to-r from-orange-500/40 to-pink-500/40"
                                    : "text-gray-400 hover:text-gray-300"
                            }`}
                    >
                        <span className="relative z-10 flex items-center">
                            <Icon className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                            <span className="ml-1 sm:ml-2 text-sm sm:text-base md:text-base">{tab.label}</span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default function ProfileContent() {
    const [activeTab, setActiveTab] = useState<"skills" | "education" | "contact">("skills");

    return (
        <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6 overflow-y-auto">
            <div className="flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 sm:gap-6">
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="relative">
                        <FaUser className="relative z-10 text-orange-400 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 p-2 sm:p-3 md:p-4 bg-gray-800 rounded-full border-2 border-orange-500/30" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-white bg-clip-text text-transparent">
                            {user.name} {user.surname}
                        </h1>
                        <p className="text-gray-300 text-sm sm:text-base md:text-gray-300 mt-1">{user.bio}</p>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 w-full md:w-auto">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
            >
                {activeTab === "skills" && <CodeSkills />}
                {activeTab === "education" && <EducationList />}
                {activeTab === "contact" && <ContactList />}
            </motion.div>
        </div>
    );
}
