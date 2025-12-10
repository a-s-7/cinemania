import { Outfit } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function SignIn() {
    return (
        <div className={`flex flex-row flex-1 ${outfit.className}`}>
            <div className="flex flex-col justify-center items-center w-2/5" style={{ background: "linear-gradient(to top, #94061eff, #040710FF)" }}>

                <div className="flex flex-col justify-start w-4/5">
                    <h1 className={`text-7xl mb-9`} style={{ fontWeight: 600 }}>
                        Welcome back!
                    </h1>
                    <h1 className={`text-xl mb-8`} style={{ fontWeight: 300 }}>
                        Enter your email and password
                    </h1>
                </div>


                <div className="flex flex-col gap-4 w-4/5">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Password" />
                    </div>

                    <h2 className="text-center">Forgot your password?</h2>
                    <Button size="sm" className="mt-4 w-full">Sign in</Button>
                    <Separator className="my-4" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-1 ">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`${outfit.className} text-8xl mb-8`} style={{ fontWeight: 600 }}>
                        cinemania
                    </h1>
                    <h2 className="mb-4">Don't have an account?</h2>
                    <Link
                        href="/signup"
                        className="px-6 py-2 rounded-3xl border border-white/20 hover:bg-white/10 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>);
}