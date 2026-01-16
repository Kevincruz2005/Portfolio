"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        _gotcha: "", // Honeypot field
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleVerifyParams = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email format first.");
            return;
        }
        setVerificationStatus("verifying");
        // Simulate an API verification check
        setTimeout(() => {
            setVerificationStatus("verified");
        }, 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Anti-Spam: Honeypot check
        if (formData._gotcha) {
            // Silently fail for bots
            setStatus("success");
            setFormData({ name: "", email: "", message: "", _gotcha: "" });
            setVerificationStatus("idle");
            setTimeout(() => setStatus("idle"), 3000);
            return;
        }

        if (verificationStatus !== "verified") return;

        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }), // Exclude _gotcha from payload
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "", _gotcha: "" });
                setVerificationStatus("idle");
                setErrorMessage("");
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                const data = await response.json();
                console.error("Server error:", data.error);
                setStatus("error");
                setErrorMessage(data.error || "Unknown error occurred");
                setTimeout(() => {
                    setStatus("idle");
                    setErrorMessage("");
                }, 5000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage("Network connection failed");
            setTimeout(() => {
                setStatus("idle");
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <section id="contact" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-surface border border-accent-primary/30 p-1 rounded-lg shadow-lg"
                    >
                        <div className="bg-surface-2 p-8 rounded border border-white/5 relative overflow-hidden">

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                    <h2 className="text-2xl font-bold text-text-primary tracking-widest flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-success" />
                                        ENCRYPTED_CHANNEL
                                    </h2>
                                    <div className="text-[10px] font-mono text-success animate-pulse">
                                        SECURE CONNECTION ESTABLISHED
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Honeypot Field (Hidden) */}
                                    <div className="hidden" aria-hidden="true">
                                        <input
                                            type="text"
                                            name="_gotcha"
                                            tabIndex={-1}
                                            value={formData._gotcha}
                                            onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-xs text-accent-primary font-mono uppercase tracking-wider">Identity</label>
                                        <Input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white font-mono focus:border-accent-primary focus:ring-0 transition-colors"
                                            placeholder="ENTER_NAME"
                                            disabled={status === "loading"}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-xs text-accent-primary font-mono uppercase tracking-wider">Frequency (Email)</label>
                                        <div className="flex gap-2">
                                            <Input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (verificationStatus === "verified") setVerificationStatus("idle");
                                                }}
                                                className={`bg-white/5 border-white/10 text-white font-mono focus:border-accent-primary focus:ring-0 transition-colors flex-1 ${verificationStatus === "verified" ? "border-success/50 text-success" : ""}`}
                                                placeholder="ENTER_EMAIL"
                                                disabled={status === "loading" || verificationStatus === "verifying"}
                                            />
                                            {verificationStatus !== "verified" && (
                                                <Button
                                                    type="button"
                                                    onClick={handleVerifyParams}
                                                    disabled={verificationStatus === "verifying" || !formData.email}
                                                    className="bg-accent-primary/10 text-accent-primary border border-accent-primary/50 hover:bg-accent-primary/20"
                                                >
                                                    {verificationStatus === "verifying" ? <Loader2 className="w-4 h-4 animate-spin" /> : "VERIFY"}
                                                </Button>
                                            )}
                                            {verificationStatus === "verified" && (
                                                <div className="flex items-center justify-center px-4 bg-success/10 border border-success/30 rounded text-success">
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-2 relative">
                                        <label className="text-xs text-accent-primary font-mono uppercase tracking-wider">Transmission</label>
                                        <div className="relative">
                                            <Textarea
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className={`bg-white/5 border-white/10 text-white font-mono focus:border-accent-primary focus:ring-0 min-h-[150px] transition-colors ${verificationStatus !== "verified" ? "opacity-50 grayscale blur-[2px]" : ""}`}
                                                placeholder="TYPE_MESSAGE..."
                                                disabled={status === "loading" || verificationStatus !== "verified"}
                                            />
                                            {verificationStatus !== "verified" && (
                                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                                    <div className="bg-black/80 px-4 py-2 rounded border border-white/10 text-xs text-text-muted flex items-center gap-2">
                                                        <Lock className="w-3 h-3" />
                                                        VERIFY_EMAIL_TO_UNLOCK
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={status === "loading" || verificationStatus !== "verified"}
                                        className={`w-full font-mono tracking-widest h-12 group transition-all duration-300 ${status === "success"
                                            ? "bg-success/20 text-success border-success"
                                            : status === "error"
                                                ? "bg-error/20 text-error border-error"
                                                : "bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary border border-accent-primary/50 hover:border-accent-primary"
                                            }`}
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : status === "success" ? (
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                        ) : status === "error" ? (
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                        ) : (
                                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                        )}
                                        {status === "loading" ? "TRANSMITTING..." :
                                            status === "success" ? "TRANSMISSION_COMPLETE" :
                                                status === "error" ? "TRANSMISSION_FAILED" :
                                                    "INITIATE_SEND"}
                                    </Button>

                                    {status === "error" && errorMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="text-xs text-error font-mono text-center bg-error/10 p-2 rounded border border-error/20"
                                        >
                                            ERROR: {errorMessage}
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
