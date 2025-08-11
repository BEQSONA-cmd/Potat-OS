import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";

const contactSocials = [
    {
        name: "GitHub",
        url: "https://github.com/BEQSONA-cmd",
        icon: FaGithub,
        color: "#181717",
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/beqa-tvildiani-8a6b21276/",
        icon: FaLinkedin,
        color: "#0077B5",
    },
    {
        name: "Portfolio",
        url: "https://beqa.live",
        icon: FaGlobe,
        color: "#22c55e",
    },
    {
        name: "Email",
        url: "mailto:tvildiani2001@gmail.com",
        icon: FaEnvelope,
        color: "#facc15",
    },
    {
        name: "Phone",
        url: "tel:+4915754871912",
        icon: FaPhone,
        color: "#3b82f6",
    },
];

export default function ContactList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactSocials.map(({ name, url, icon: Icon, color }, idx) => (
                <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all overflow-hidden"
                >
                    <div
                        className="p-2 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: color + "33" }}
                    >
                        <Icon style={{ color }} size={20} />
                    </div>
                    <span className="font-medium">{name}</span>
                </a>
            ))}
        </div>
    );
}
