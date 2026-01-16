"use client";

import { motion } from "framer-motion";
import { Terminal, Layout, Database, Server, Cpu } from "lucide-react";

import { skills as skillsData } from "@/lib/data";

const iconMap: Record<string, any> = {
    "BACKEND & SYSTEMS": { icon: Server, color: "text-accent-primary" },
    "FRONTEND & UI": { icon: Layout, color: "text-accent-secondary" },
    "DATABASE & STORAGE": { icon: Database, color: "text-success" },
    "TOOLS": { icon: Terminal, color: "text-orange-400" },
    "LOW-LEVEL & CORE": { icon: Cpu, color: "text-purple-400" },
};

const skills = skillsData.map(skill => ({
    ...skill,
    ...iconMap[skill.category]
}));

export function Skills() {
    return (
        <section id="skills" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-12 justify-end">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-secondary/50"></div>
                    <h2 className="text-3xl font-bold text-text-primary tracking-widest flex items-center gap-2">
                        SKILL_MATRIX
                        <Layout className="text-accent-secondary" />
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-secondary/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-surface/30 border border-white/5 p-4 rounded hover:border-white/20 transition-colors group relative"
                        >
                            <h3 className={`font-mono text-sm font-bold mb-4 flex items-center gap-2 ${skill.color}`}>
                                <skill.icon className="w-4 h-4" />
                                {skill.category}
                            </h3>

                            <ul className="space-y-2">
                                {skill.items.map((item: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-text-secondary font-mono">
                                        <div className={`w-1 h-1 rounded-full ${skill.color.replace('text-', 'bg-')}`}></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
