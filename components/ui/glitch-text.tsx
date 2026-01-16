"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string; // Allow passing Tailwind classes
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <motion.span
                className="absolute top-0 left-0 -z-10 w-full text-accent-primary opacity-70"
                initial={{ x: 0 }}
                animate={{ x: [-2, 2, -2, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    repeatType: "mirror",
                    repeatDelay: 3
                }}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)" }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 w-full text-error opacity-70"
                initial={{ x: 0 }}
                animate={{ x: [2, -2, 2, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    repeatType: "mirror",
                    repeatDelay: 4
                }}
                style={{ clipPath: "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)" }}
            >
                {text}
            </motion.span>
        </div>
    );
}
