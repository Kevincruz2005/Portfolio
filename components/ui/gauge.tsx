"use client";

import { motion } from "framer-motion";

interface GaugeProps {
    value: number; // 0 to 100
    color: string; // Tailwind text color class (e.g., "text-accent-primary")
    label?: string;
}

export function Gauge({ value, color, label }: GaugeProps) {
    // Convert percentage to 0-100 range
    const clampedValue = Math.min(Math.max(value, 0), 100);

    // SVG properties
    const radius = 40;
    const circumference = Math.PI * radius; // Half circle circumference
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    // Extract hex color from tailwind class or use a mapping if needed.
    // Since we are passing tailwind classes like "text-neon-pink", we need to apply them to the stroke.
    // However, SVG stroke needs a color value or "currentColor".
    // We will use "currentColor" and apply the class to the parent or the path.

    return (
        <div className="relative w-48 h-24 flex items-end justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 50">
                {/* Background Arc */}
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/10"
                />

                {/* Foreground Arc (Progress) */}
                <motion.path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={color}
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                />
            </svg>

            {/* Center Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 text-center">
                <div className={`text-2xl font-bold font-mono ${color}`}>
                    {value}%
                </div>
                {label && (
                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-1">
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
}
