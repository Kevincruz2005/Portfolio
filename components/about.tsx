"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Terminal, Activity, MapPin, TrendingUp, Wrench } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";

export function About() {
    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-surface/80 border border-white/10 p-1 rounded-lg backdrop-blur-md"
                    >
                        <div className="bg-white/5 border border-white/5 p-8 rounded relative overflow-hidden grid md:grid-cols-[300px_1fr] gap-8 items-center">

                            {/* Animated Logo / Avatar Section */}
                            <div className="relative flex justify-center items-center">
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-dashed border-accent-primary/30 rounded-full w-48 h-48 mx-auto"
                                ></motion.div>
                                <motion.div
                                    initial={{ rotate: 360 }}
                                    animate={{ rotate: 0 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border border-accent-secondary/30 rounded-full w-56 h-56 mx-auto -m-4"
                                ></motion.div>

                                <div className="relative w-40 h-40 bg-black/50 rounded-full flex items-center justify-center border-2 border-accent-primary overflow-hidden shadow-lg">
                                    <User className="w-20 h-20 text-white relative z-10" />
                                    <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 text-accent-primary border-b border-white/10 pb-4">
                                    <Terminal className="w-5 h-5" />
                                    <h3 className="font-mono text-lg tracking-widest">USER_PROFILE.dat</h3>
                                </div>

                                <div className="space-y-6 font-mono text-sm md:text-base">
                                    <RevealText
                                        text="Backend-focused Computer Science undergraduate with hands-on  experience in API development, database design, authenticationand systems programming. Strong foundation in Java, Go, SQL   and RESTful architectures, with practical exposure to PostgreSQL and backend security mechanisms. Actively seeking backend  engineering entry-level roles."
                                        className="text-lg text-text-secondary leading-relaxed mb-6 block"
                                        delay={2}
                                    />


                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
                                    >
                                        {[
                                            { label: "STATUS", value: "ACTIVE", icon: Activity, gradient: "from-emerald-500/20 to-green-500/20", border: "border-emerald-500/30", text: "text-emerald-400" },
                                            { label: "LOCATION", value: "EARTH", icon: MapPin, gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30", text: "text-blue-400" },
                                            { label: "LEVEL", value: "20", icon: TrendingUp, gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30", text: "text-purple-400" },
                                            { label: "CLASS", value: "ENGINEER", icon: Wrench, gradient: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30", text: "text-orange-400" },
                                        ].map((stat, i) => (
                                            <div key={i} className={`bg-gradient-to-br ${stat.gradient} p-3 rounded border ${stat.border} text-center hover:scale-105 transition-all group relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                                                <div className="relative z-10">
                                                    <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.text} group-hover:animate-pulse`} />
                                                    <div className="text-[10px] text-text-muted mb-1 font-medium">{stat.label}</div>
                                                    <div className={`${stat.text} font-bold text-lg tracking-wider`}>{stat.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
