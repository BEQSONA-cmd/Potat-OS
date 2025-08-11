"use client";
import React, { useState } from "react";
import CodeSkills from "@/components/Profile/CodeSkills";
import EducationList from "@/components/Profile/EducationList";
import ContactList from "@/components/Profile/ContactList";
import { FaUser, FaCode, FaGraduationCap, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const user = {
    name: "Beqa",
    surname: "Tvildiani",
    bio: "Software Developer",
};

const tabs = [
    { id: "skills", label: "Skills", icon: FaCode },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "contact", label: "Contact", icon: FaEnvelope },
];

const activeTab = ""

function TabsComponent({
    activeTab,
    setActiveTab,
}: {
    activeTab: "skills" | "education" | "contact";
    setActiveTab: (tab: "skills" | "education" | "contact") => void;
}) {
    return (
        <div className="flex gap-2 bg-gray-800/50 p-1 rounded-xl border border-gray-700">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as "skills" | "education" | "contact")}
                        className={`relative px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                            activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-300"
                        }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 rounded-lg border border-orange-500/20"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">
                            <Icon className="inline mr-2" />
                            {tab.label}
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
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <FaUser className="relative z-10 text-orange-400 w-20 h-20 p-4 bg-gray-800 rounded-full border-2 border-orange-500/30" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-white bg-clip-text text-transparent">
                            {user.name} {user.surname}
                        </h1>
                        <p className="text-gray-300 mt-1">{user.bio}</p>
                    </div>
                </div>

                {/* Tabs */}
                <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} />
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
