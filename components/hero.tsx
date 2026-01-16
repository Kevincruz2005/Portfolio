"use client";

import { Terminal } from "@/components/terminal";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";

export function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center px-4 md:px-20 pt-20 relative overflow-hidden">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none"></div>

            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-block px-3 py-1 border border-accent-primary/30 bg-accent-primary/5 text-accent-primary text-xs font-mono tracking-widest rounded-full mb-4">
                        SYSTEM_ONLINE // V2.0.25
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tighter">
                        KEVIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">CRUZ</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-text-secondary font-mono border-l-2 border-accent-secondary pl-4">
                        Full Stack Developer <span className="text-accent-primary">|</span> Backend Focused
                    </h2>

                    <p className="text-text-muted text-lg max-w-xl leading-relaxed">
                        Building robust, scalable server-side systems. Specialized in distributed architectures,
                        database optimizations, and secure API design.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <div className="h-2 w-20 bg-accent-primary/20 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-primary w-2/3 animate-pulse"></div>
                        </div>
                        <div className="h-2 w-10 bg-accent-secondary/20 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-secondary w-1/2 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                        </div>
                    </div>
                </motion.div>

                {/* Interactive Terminal */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-lg blur opacity-20 animate-pulse"></div>
                    <Terminal />
                </div>
            </div>
        </section>
    );
}
