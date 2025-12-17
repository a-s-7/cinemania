'use client'

import { AlertCircleIcon, MailCheckIcon, Send } from "lucide-react";
import { Outfit } from "next/font/google";
import { useSearchParams } from 'next/navigation'
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { SIGNUP_REDIRECT_URL } from "@/lib/urls";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function EmailConfirm() {
    const searchParams = useSearchParams()
    const email = searchParams.get('e')
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const resendEmail = async () => {
        if (!email) {
            return
        }

        const supabase = createClient()

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: SIGNUP_REDIRECT_URL
            }
        })

        if (error) {
            setAlertMessage(error.message);
        } else {
            setAlertMessage("Email resent successfully");
        }

        setAlertStatus(false)
        setTimeout(() => setAlertStatus(true), 100)

        return;
    }

    return (
        <div className={`flex flex-1 ${outfit.className} bg-[linear-gradient(to_top,#94061eff,white)] dark:bg-[linear-gradient(to_top,#94061eff,#040710FF)] text-black dark:text-white`}>
            <div className="flex flex-col gap-6 items-center justify-center mx-auto my-auto p-24 rounded-3xl bg-white/30 dark:bg-black/30 text-center shadow-lg animate-fadeIn">
                <Send className="w-24 h-24" strokeWidth={1} />

                <h1 className="text-5xl font-medium">Check your email</h1>

                <p className="text-xl">
                    A confirmation email has been sent to <span className="font-semibold">{email}</span>.
                </p>

                <p className="text-lg">
                    To confirm your email address, please check your inbox and click the confirmation link.
                </p>

                <p className="text-lg">Didn't receive the email?</p>

                <button
                    className="px-6 py-2 
                                rounded-4xl border border-[#040710FF] dark:border-white 
                                hover:bg-[#040710FF] hover:text-white 
                                hover:dark:bg-white hover:dark:text-[#040710FF]
                                active:scale-95 transition-transform duration-100"
                    onClick={resendEmail}
                >
                    Resend confirmation email
                </button>

                <Alert
                    className={`
                        flex items-center justify-center p-2 text-sm w-auto border
                        rounded-lg transition-all duration-300 ease-out
                        ${alertStatus ? "opacity-100 translate-y-0" : "opacity-0 scale-95 translate-y-8 pointer-events-none"}
                        ${alertMessage === "Email resent successfully"
                            ? " dark:bg-green-500/80 bg-green-700 border-green-700 dark:border-green-500"
                            : "dark:bg-red-500/80 bg-red-700 border-red-700 dark:border-red-500"
                        }
                    `}
                >
                    {alertMessage === "Email resent successfully"
                        ? <MailCheckIcon className="mr-2 stroke-white dark:stroke-white" />
                        : <AlertCircleIcon className="mr-2 stroke-white dark:stroke-white" />
                    }
                    <AlertTitle className="text-[#040710FF] dark:text-white text-center">
                        {alertMessage}
                    </AlertTitle>
                </Alert>
            </div>
        </div>
    );
}