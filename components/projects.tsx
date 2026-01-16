"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Folder, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";

export function Projects() {
    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-primary/50"></div>
                    <h2 className="text-3xl font-bold text-text-primary tracking-widest flex items-center gap-2">
                        <LayersIcon className="text-accent-primary" />
                        PROJECT_ARCHIVES
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-primary/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-surface/50 border border-white/10 hover:border-accent-primary/50 transition-all duration-300 group relative overflow-hidden h-full flex flex-col backdrop-blur-sm">
                                {/* Holographic Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                <CardHeader className="pb-2 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="font-mono text-lg text-accent-primary group-hover:text-white transition-colors flex items-center gap-2">
                                            <Folder className="w-4 h-4" />
                                            {project.title}
                                        </CardTitle>
                                        <div className="text-[10px] text-text-muted font-mono border border-white/10 px-1 rounded">
                                            ID: {String(index + 1).padStart(3, '0')}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="relative z-10 flex-1">
                                    <p className="font-mono text-sm text-text-secondary mb-4 line-clamp-3 group-hover:text-text-primary transition-colors">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.split(",").map((tag: string, i: number) => (
                                            <span key={i} className="text-[10px] font-mono text-accent-secondary border border-accent-secondary/20 px-2 py-0.5 rounded bg-accent-secondary/5">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-4 relative z-10 border-t border-white/5">
                                    <Link href={project.link || "#"} className="w-full">
                                        <Button variant="ghost" className="w-full justify-between text-xs font-mono text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 group-hover:border-accent-primary/30 border border-transparent transition-all">
                                            <span>ACCESS_SOURCE</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </Button>
                                    </Link>
                                </CardFooter>

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LayersIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}
