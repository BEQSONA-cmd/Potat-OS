"use client";
import React from "react";
import { FaCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";
import { I_Skills, skills } from "./skills";
import { IconType } from "react-icons";

function SkillBar({ name, level, color, icon: Icon }: I_Skills) {
    return (
        <div className="mb-4">
            <div className="flex items-center justify-between text-sm font-medium mb-1">
                <div className="flex items-center gap-2">
                    <Icon style={{ color }} className="text-lg" />
                    <span>{name}</span>
                </div>
                <span className="text-gray-400">{level}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all"
                    style={{
                        width: `${level}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                    }}
                />
            </div>
        </div>
    );
}

interface SkillSectionProps {
    title: string;
    skills: I_Skills[];
    icon: IconType;
}

function SkillSection({ title, skills, icon: Icon }: SkillSectionProps) {
    return (
        <div className="relative bg-gradient-to-b from-gray-800/80 to-gray-900/80 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all group overflow-hidden">
            {/* Decorative glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Header */}
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 flex items-center gap-2 text-gray-200">
                <Icon className="text-blue-400" />
                {title}
            </h2>

            {/* Skills */}
            <div className="relative z-10 space-y-4">
                {skills.map((skill, idx) => (
                    <SkillBar key={idx} {...skill} />
                ))}
            </div>
        </div>
    );
}

export default function CodeSkills() {
    const { languages, frameworks, databases, devOps } = skills;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
            <SkillSection title="Languages" skills={languages} icon={FaCode} />
            <SkillSection title="Frameworks & Libraries" skills={frameworks} icon={FaServer} />
            <SkillSection title="Databases" skills={databases} icon={FaDatabase} />
            <SkillSection title="DevOps & Tools" skills={devOps} icon={FaTools} />
        </div>
    );
}
