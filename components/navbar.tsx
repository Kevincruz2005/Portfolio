"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Layers, Code, Mail } from "lucide-react";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/5"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-accent-primary/10 border border-accent-primary/50 flex items-center justify-center rounded group-hover:bg-accent-primary/20 transition-colors">
                        <span className="text-accent-primary font-bold font-mono">KC</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: "ABOUT", href: "#about", icon: Cpu },
                        { name: "PROJECTS", href: "#projects", icon: Layers },
                        { name: "SKILLS", href: "#skills", icon: Code },
                        { name: "CONTACT", href: "#contact", icon: Mail },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-accent-primary transition-colors relative group"
                        >
                            <item.icon className="w-3 h-3" />
                            <span>{item.name}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-primary group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-success/80 border border-success/20 px-2 py-1 rounded bg-success/5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                    ONLINE
                </div>
            </div>
        </motion.nav>
    );
}
