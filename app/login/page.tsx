"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="scanlines"></div>
            <Card className="w-[350px] bg-gray-900 border-green-500 border-2 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] relative z-10">
                <CardHeader>
                    <CardTitle className="text-2xl text-green-500 font-press-start-2p text-center">LOGIN</CardTitle>
                    <CardDescription className="text-green-400/70 text-center font-vt323 text-xl">
                        INSERT COIN TO START
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-vt323 text-xl border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
                        onClick={() => signIn("github")}
                    >
                        LOGIN WITH GITHUB
                    </Button>
                    <div className="text-center text-xs text-green-500/50 font-press-start-2p mt-4">
                        PRESS START
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
