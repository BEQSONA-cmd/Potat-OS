import { LuUniversity } from "react-icons/lu";
import { Si42 } from "react-icons/si";
import { FaMapMarkerAlt, FaLink, FaGraduationCap } from "react-icons/fa";

const education = [
    {
        icon: Si42,
        institution: "42 Wolfsburg",
        courseName: "Software/Web Development",
        from: "Nov. 2023",
        to: "Nov. 2025",
        skills: [
            "Problem Solving",
            "Critical Thinking",
            "C Programming",
            "C++ OOP",
            "Software & Web Development",
            "Databases & DevOps",
        ],
        country: "Germany",
        city: "Wolfsburg",
        link: "https://42wolfsburg.de/",
    },
    {
        icon: LuUniversity,
        institution: "Technische Universität Clausthal",
        courseName: "Software Engineering",
        from: "Mar. 2025",
        to: "Jun. 2025",
        skills: [
            "Java / Spring Boot",
            "TypeScript / React",
            "Problem Solving",
            "Git & GitLab",
            "UML Diagrams",
            "Agile/Scrum Project Management",
        ],
        country: "Germany",
        city: "Goslar",
        link: "https://www.tu-clausthal.de/",
    },
];

export default function EducationList() {
    return (
        <div className="flex flex-col gap-4 sm:gap-6">
            {education.map((edu, idx) => (
                <div
                    key={idx}
                    className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 hover:border-blue-500/30 group overflow-hidden"
                >
                    {/* Decorative background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Header section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 relative z-10">
                        <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20 flex-shrink-0">
                            <edu.icon className="text-xl sm:text-2xl" />
                        </div>
                        <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white">{edu.institution}</h3>
                                    <p className="text-blue-400 font-medium text-sm sm:text-base">{edu.courseName}</p>
                                </div>
                                <span className="mt-2 sm:mt-0 inline-block bg-blue-500/20 text-blue-400 text-xs sm:text-sm px-2 py-1 rounded-full">
                                    {edu.from} — {edu.to}
                                </span>
                            </div>

                            {/* Location and link */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1 text-gray-400">
                                    <FaMapMarkerAlt className="text-blue-400" />
                                    <span className="text-sm sm:text-base">
                                        {edu.city}, {edu.country}
                                    </span>
                                </div>
                                <a
                                    href={edu.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                                >
                                    <FaLink className="text-blue-400" />
                                    <span>Website</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Skills section */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3 text-gray-400 text-sm sm:text-base">
                            <FaGraduationCap className="text-blue-400" />
                            <span className="font-medium">Key Skills & Technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {edu.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700/50 text-gray-300 text-xs sm:text-sm rounded-full border border-gray-600 hover:bg-blue-500/20 hover:border-blue-500/30 hover:text-blue-300 transition-all"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
