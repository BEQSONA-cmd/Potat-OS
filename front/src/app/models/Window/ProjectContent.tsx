import React from "react";
import { projects } from "@/components/Project/projects";

export default function ProjectContent({ fileName }: { fileName: string }) {
    const baseFileName = fileName.split(".")[0];
    const currentProject = projects.find((project) => project.name === baseFileName);

    if (!currentProject) {
        return <div>Project not found {fileName}</div>;
    }

    return (
        <div className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto scrollbar-hide">
            {/* Terminal-inspired header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    {currentProject.name}
                </h1>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column - Project info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description card */}
                    <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-blue-500">
                        <h2 className="text-xl font-mono mb-3 text-blue-400">DESCRIPTION</h2>
                        <p className="text-gray-300">{currentProject.description}</p>
                    </div>

                    {/* How it works card */}
                    <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-purple-500">
                        <h2 className="text-xl font-mono mb-3 text-purple-400">HOW IT WORKS</h2>
                        <p className="text-gray-300">{currentProject.howItWorks}</p>
                    </div>

                    {/* What I learned card */}
                    <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-mono mb-3 text-green-400">WHAT I LEARNED</h2>
                        <p className="text-gray-300">{currentProject.whatILearn}</p>
                    </div>
                </div>

                {/* Right column - Tech stack and links */}
                <div className="space-y-6">
                    {/* Tech stack */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-xl font-mono mb-4 text-yellow-400">TECH STACK</h2>

                        <div className="mb-6">
                            <h3 className="font-mono text-sm text-gray-400 mb-2">LANGUAGES</h3>
                            <div className="space-y-3">
                                {currentProject.languages.map((lang) => (
                                    <div key={lang.name}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="flex items-center gap-2">
                                                {lang.icon && <lang.icon style={{ color: lang.color }} />}
                                                {lang.name}
                                            </span>
                                            <span>{lang.precent}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${lang.precent}%`,
                                                    backgroundColor: lang.color,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-mono text-sm text-gray-400 mb-2">TECHNOLOGIES</h3>
                            <div className="flex flex-wrap gap-3">
                                {currentProject.technologies.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <h2 className="text-xl font-mono mb-4 text-pink-400">LINKS</h2>
                        <div className="space-y-3">
                            {currentProject.link && (
                                <a
                                    href={currentProject.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <currentProject.link.icon className="text-xl" />
                                    <span>{currentProject.link.name}</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
