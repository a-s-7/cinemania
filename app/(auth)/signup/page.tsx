"use client"

import { Outfit } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react"
import { Eye, EyeOff } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupButton } from "@/components/ui/input-group";
import { useRouter } from 'next/navigation'
import { SIGNUP_REDIRECT_URL } from "@/lib/urls";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const emailAlerts = ["Missing email", "Please enter a valid email address"];
    const passwordAlerts = ["Passwords do not match", "Please enter and confirm password", "Password should be at least 6 characters."];
    const router = useRouter()

    const handleSignUp = async () => {
        if (!email) {
            setAlertMessage("Missing email");
            setAlertStatus(true);
            return;
        }

        if (!password || !confirmPassword) {
            setAlertMessage("Please enter and confirm password");
            setAlertStatus(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match");
            setAlertStatus(true);
            return;
        }

        const supabase = createClient()

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: SIGNUP_REDIRECT_URL
            }
        });

        if (error) {
            if (error.message === "Unable to validate email address: invalid format") {
                setAlertMessage("Please enter a valid email address");
            } else {
                setAlertMessage(error.message);
            }
            setAlertStatus(true);
            return;
        } else {
            router.push(`/emailConfirm?e=${encodeURIComponent(email)}`);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value !== confirmPassword && confirmPassword) {
            setAlertStatus(true);
            setAlertMessage("Passwords do not match");
        } else {
            setAlertStatus(false);
            setAlertMessage("");
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (e.target.value !== password) {
            setAlertStatus(true);
            setAlertMessage("Passwords do not match");
        } else {
            setAlertStatus(false);
            setAlertMessage("");
        }
    };

    return (
        <div className={`flex flex-row flex-1 ${outfit.className} bg-[linear-gradient(to_top,#94061eff,white)]
            dark:bg-[linear-gradient(to_top,#94061eff,#040710FF)]`}>

            <div className="flex flex-col justify-center items-center w-2/5">

                <div className="flex flex-col justify-start w-4/5">
                    <h1 className={`text-7xl mb-9`} style={{ fontWeight: 600 }}>
                        Hello there!
                    </h1>
                    <h1 className={`text-xl mb-8`} style={{ fontWeight: 300 }}>
                        Create an account
                    </h1>
                </div>

                <div className="flex flex-col gap-4 w-4/5">
                    {/* <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" className="text-lg">Username</Label>
                        <Input type="text" id="username" placeholder="Username" />
                    </div> */}

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
                                onChange={e => handlePasswordChange(e)}
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

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="confirmPassword" className="text-lg">Confirm Password</Label>
                        <InputGroup className={`${alertStatus && passwordAlerts.includes(alertMessage) ? "border border-red-800 border-2" : ""} bg-white/70`}>
                            <InputGroupInput
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={e => handleConfirmPasswordChange(e)}
                            />
                            <InputGroupButton
                                type="button"
                                className="hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </InputGroupButton>
                        </InputGroup>
                    </div>

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


                    <Button onClick={handleSignUp}
                        className="h-10 text-lg active:scale-95 transition-transform duration-350"
                        style={{ fontWeight: 600 }}>Sign up</Button>
                    <Separator className="my-4 dark:bg-white bg-black" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center flex-1 dark:bg-[#040710FF]/60 bg-white/60">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`${outfit.className} text-8xl mb-8`} style={{ fontWeight: 600 }}>
                        cinemania
                    </h1>
                    <h2 className="mb-4">Already have an account?</h2>
                    <Link
                        href="/signin"
                        className="px-10 py-2 rounded-3xl border dark:border-white/20 border-black/20 hover:dark:bg-white/10 hover:bg-black/20 transition"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div >);
}
