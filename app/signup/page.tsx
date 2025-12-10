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
                    <h1 className={`text-7xl mb-8`} style={{ fontWeight: 600 }}>
                        Hello there!
                    </h1>
                    <h1 className={`text-xl mb-8`} style={{ fontWeight: 300 }}>
                        Enter your details
                    </h1>
                </div>


                <div className="flex flex-col gap-4 w-4/5">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col space-y-2 w-1/2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input type="text" id="firstName" placeholder="First Name" />
                        </div>

                        <div className="flex flex-col space-y-2 w-1/2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input type="text" id="lastName" placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" placeholder="Password" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input type="password" id="confirmPassword" placeholder="Confirm Password" />
                    </div>

                    <Button size="sm" className="mt-4 w-full">Sign up</Button>
                    <Separator className="my-4" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-1 ">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`${outfit.className} text-8xl mb-8`} style={{ fontWeight: 600 }}>
                        cinemania
                    </h1>
                    <h2 className="mb-4 ">Already have an account?</h2>
                    <Link
                        href="/signin"
                        className="px-6 py-2 rounded-3xl border border-white/20 hover:bg-white/10 transition"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>);
}

