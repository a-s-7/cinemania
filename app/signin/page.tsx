"use client"

import { Outfit } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailAlerts = ["Please enter email", "Invalid login credentials"];
    const passwordAlerts = ["Please enter password", "Invalid login credentials"];

    const router = useRouter()


    const handleSignIn = async () => {
        if (!email) {
            setAlertMessage("Please enter email");
            setAlertStatus(true);
            return;
        }

        if (!password) {
            setAlertMessage("Please enter password");
            setAlertStatus(true);
            return;
        }

        const supabase = await createClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setAlertMessage(error.message);
            setAlertStatus(true);
            return;
        } else {
            router.push(`/`);
            return;
        }
    }


    return (
        <div className={`flex flex-row flex-1 ${outfit.className} bg-[linear-gradient(to_top,#94061eff,white)]
            dark:bg-[linear-gradient(to_top,#94061eff,#040710FF)]`}>

            <div className="flex flex-col justify-center items-center w-2/5">

                <div className="flex flex-col justify-start w-4/5">
                    <h1 className={`text-7xl mb-9`} style={{ fontWeight: 600 }}>
                        Welcome back!
                    </h1>
                    <h1 className={`text-xl mb-8`} style={{ fontWeight: 300 }}>
                        Enter your details
                    </h1>
                </div>


                <div className="flex flex-col gap-4 w-4/5">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-lg">Email address</Label>
                        <Input type="email" id="email" className={`${alertStatus && emailAlerts.includes(alertMessage) ? "border border-red-800 border-2" : ""} bg-white/70`} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="password" className="text-lg">Password</Label>
                        <InputGroup className={`${alertStatus && passwordAlerts.includes(alertMessage) ? "border border-red-800 border-2" : ""} bg-white/70`}>
                            <InputGroupInput
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <InputGroupButton
                                type="button"
                                className="hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </InputGroupButton>
                        </InputGroup>
                    </div>


                    {/* <Link href="/passwordReset" className="text-center mt-2">Forgot your password?</Link> */}

                    <div className="h-10 flex items-center">
                        <Alert
                            className={`
                            flex items-center text-[#040710FF] dark:text-white dark:bg-black/40 bg-white/40 p-2 text-sm w-auto
                            transition-all duration-300 ease-out
                            ${alertStatus
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
                        `}
                        >
                            <AlertCircleIcon className="mr-2" />
                            <AlertTitle>
                                {alertMessage}
                            </AlertTitle>
                        </Alert>
                    </div>

                    <Button onClick={handleSignIn}
                        className="mt-2 h-10 text-lg" style={{ fontWeight: 600 }}>Sign in</Button>
                    <Separator className="my-4 dark:bg-white bg-black" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-1 dark:bg-[#040710FF]/60 bg-white/60">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`${outfit.className} text-8xl mb-8`} style={{ fontWeight: 600 }}>
                        cinemania
                    </h1>
                    <h2 className="mb-4">Don't have an account?</h2>
                    <Link
                        href="/signup"
                        className="px-10 py-2 rounded-3xl border dark:border-white/20 border-black/20 hover:dark:bg-white/10 hover:bg-black/20 transition"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>);
}