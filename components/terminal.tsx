"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { projects } from "@/lib/data";

interface Command {
    input: string;
    output: React.ReactNode;
}

export function Terminal() {
    const [history, setHistory] = useState<Command[]>([]);
    const [input, setInput] = useState("");
    const [interactiveMode, setInteractiveMode] = useState<"name" | "email" | null>(null);
    const [resumeData, setResumeData] = useState({ name: "", email: "" });
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const commands = useMemo<Record<string, () => React.ReactNode>>(() => ({
        help: () => (
            <div className="space-y-1 text-text-secondary">
                <p>Available commands:</p>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-accent-primary">about</span>
                    <span>Display user information</span>
                    <span className="text-accent-primary">projects</span>
                    <span>List projects</span>
                    <span className="text-accent-primary">skills</span>
                    <span>Show technical skills</span>
                    <span className="text-accent-primary">contact</span>
                    <span>Display contact info</span>
                    <span className="text-accent-primary">clear</span>
                    <span>Clear terminal</span>
                </div>
            </div>
        ),
        about: () => (
            <div className="text-text-muted max-w-2xl">
                <p className="mb-2">
                    <span className="text-accent-secondary">USER:</span> Kevin Cruz
                </p>
                <p className="mb-2">
                    <span className="text-accent-secondary">ROLE:</span> Full Stack Developer | Backend Focused
                </p>
                <p>
                    Backend-focused C.S. undergraduate. Specializing in API development, database design,
                    and secure systems programming.
                </p>
            </div>
        ),
        projects: () => (
            <div className="space-y-2">
                <p className="text-text-secondary">Fetching projects from local archives...</p>
                <div className="grid gap-2">
                    {projects.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-success">➜</span>
                            <a href="#projects" className="hover:underline hover:text-accent-primary">{p.title}</a>
                        </div>
                    ))}
                    <p className="text-text-muted text-sm mt-2">Type 'projects' for details or scroll down.</p>
                </div>
            </div>
        ),
        skills: () => (
            <div className="grid grid-cols-2 gap-4 max-w-lg">
                <div>
                    <h4 className="text-accent-secondary mb-1">Languages</h4>
                    <ul className="text-text-secondary text-sm list-disc list-inside">
                        <li>Java / C / Go</li>
                        <li>JavaScript / Python</li>
                        <li>SQL / x86 Assembly</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-accent-secondary mb-1">Frameworks & Tools</h4>
                    <ul className="text-text-secondary text-sm list-disc list-inside">
                        <li>Node.js / Express</li>
                        <li>React / Next.js</li>
                        <li>PostgreSQL / Docker</li>
                    </ul>
                </div>
            </div >
        ),
        contact: () => (
            <div className="text-text-muted">
                <p>LinkedIn: <a href="https://www.linkedin.com/in/kevin-cruz-32a8642ba" className="text-accent-primary hover:underline">linkedin.com</a></p>
                <p>GitHub: <a href="https://github.com/Kevincruz2005" className="text-accent-primary hover:underline">github.com/kevincruz</a></p>
            </div>
        ),
        clear: () => {
            setHistory([]);
            return null;
        },
    }), []);

    const addToHistory = (cmd: string, output: React.ReactNode) => {
        setHistory((prev) => [...prev, { input: cmd, output }]);
    };

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim(); // Don't lowercase yet to preserve name case
        if (!trimmed) return;

        // Handle Interactive Modes
        if (interactiveMode === "name") {
            addToHistory(input, null); // Show user input
            setResumeData(prev => ({ ...prev, name: input }));
            addToHistory("", <span className="text-accent-primary">Please enter your email:</span>);
            setInteractiveMode("email");
            setInput("");
            return;
        }

        if (interactiveMode === "email") {
            addToHistory(input, null);
            setResumeData(prev => ({ ...prev, email: input }));
            setInteractiveMode(null);

            // Show processing message
            addToHistory("", <span className="text-text-muted">Processing request...</span>);

            try {
                // Call API
                const finalData = { name: resumeData.name, email: trimmed };
                await fetch('/api/resume', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData)
                });

                // Simulate package download text
                const downloadOutput = (
                    <div className="space-y-1 text-text-muted">
                        <p>Reading package lists... Done</p>
                        <p>Building dependency tree... Done</p>
                        <p>Reading state information... Done</p>
                        <p>The following NEW packages will be installed:</p>
                        <p className="pl-4 text-success">resume</p>
                        <p>0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.</p>
                        <p>Need to get 1.4 MB of archives.</p>
                        <p>Get:1 http://kevin.portfolio/archives resume 1.0.0 [1.4 MB]</p>
                        <p>Fetched 1.4 MB in 0.5s (2.8 MB/s)</p>
                        <p>Unpacking resume (1.0.0) ...</p>
                        <p className="text-accent-primary mt-2">Resume downloaded successfully.</p>
                    </div>
                );

                addToHistory("", downloadOutput);

                // Trigger Download
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '/Kevin_Cruz_Resume.pdf';
                    link.download = 'Kevin_Cruz_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 1000);

            } catch (error) {
                console.error(error);
                addToHistory("", <span className="text-error">Error processing request. Resume download initiated anyway.</span>);
                // Fallback download
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '/Kevin_Cruz_Resume.pdf';
                    link.download = 'Kevin_Cruz_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 1000);
            }
            setInput("");
            return;
        }

        // Handle Standard Commands
        const lowerCmd = trimmed.toLowerCase();
        let output: React.ReactNode;

        if (commands[lowerCmd]) {
            output = commands[lowerCmd]();
        } else if (lowerCmd === "ls") {
            output = commands.projects();
        } else {
            output = <span className="text-error">Command not found: {trimmed}. Type 'help' for options.</span>;
        }

        if (lowerCmd !== "clear") {
            addToHistory(trimmed, output);
        }
        setInput("");
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Initial greeting
    useEffect(() => {
        setHistory([
            {
                input: "whoami",
                output: commands.about(),
            },
            {
                input: "help",
                output: commands.help(),
            },
        ]);
    }, [commands]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto bg-surface/90 border border-white/10 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm"
        >
            {/* Terminal Header */}
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2 text-sm text-text-secondary font-mono">
                    <TerminalIcon className="w-4 h-4 text-accent-primary" />
                    <span>kevin@portfolio:~</span>
                </div>
                <div className="flex items-center gap-2">
                    <Minus className="w-4 h-4 text-text-muted hover:text-white cursor-pointer" />
                    <Square className="w-3 h-3 text-text-muted hover:text-white cursor-pointer" />
                    <X className="w-4 h-4 text-text-muted hover:text-error cursor-pointer" />
                </div>
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="p-6 h-[400px] overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="space-y-4">
                    {history.map((cmd, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex items-center gap-2 text-text-secondary">
                                <span className="text-accent-primary">➜</span>
                                <span className="text-accent-secondary">~</span>
                                <span>{cmd.input}</span>
                            </div>
                            <div className="pl-6 animate-in fade-in duration-300">
                                {cmd.output}
                            </div>
                        </div>
                    ))}

                    {/* Active Prompt for Interactive Mode */}
                    {interactiveMode === 'name' && (
                        <div className="flex items-center gap-2 mt-2 text-text-muted">
                            <span className="text-accent-primary">Input Name:</span>
                        </div>
                    )}
                    {interactiveMode === 'email' && (
                        <div className="flex items-center gap-2 mt-2 text-text-muted">
                            <span className="text-accent-primary">Input Email:</span>
                        </div>
                    )}

                </div>

                {/* Input Line */}
                <form onSubmit={handleCommand} className="mt-4 flex items-center gap-2">
                    {interactiveMode === null && (
                        <>
                            <span className="text-accent-primary">➜</span>
                            <span className="text-accent-secondary">~</span>
                        </>
                    )}
                    {(interactiveMode === 'name' || interactiveMode === 'email') && (
                        <span className="text-success">➜</span>
                    )}

                    <input
                        ref={inputRef}
                        type={interactiveMode === 'email' ? 'email' : 'text'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-white flex-1 focus:ring-0 p-0"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="w-2 h-5 bg-accent-primary animate-pulse"></span>
                </form>
            </div>
        </motion.div>
    );
}
