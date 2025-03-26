import { motion } from "framer-motion";

const genreColors = {
    Action: "from-red-500 to-orange-500",
    Comedy: "from-yellow-400 to-yellow-600",
    Drama: "from-indigo-500 to-purple-500",
    Horror: "from-gray-700 to-black",
    SciFi: "from-green-400 to-blue-500",
    Romance: "from-pink-500 to-red-400",
    Fantasy: "from-teal-400 to-cyan-500",
    default: "from-gray-400 to-gray-600"
};

export default function GenreTag({ genreName }) 
{
    const colorClass = genreColors[genreName] || genreColors.default;

    return (
        <motion.span
            whileHover={{ y: -2, scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`bg-gradient-to-r ${colorClass} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md cursor-pointer`}
        >
            {genreName}
        </motion.span>
    );
}
