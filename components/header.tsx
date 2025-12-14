'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { Outfit } from "next/font/google";

import { Search } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

import { createClient } from "@/lib/supabase/client";
import { Session } from '@supabase/supabase-js';
import router from 'next/router';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuShortcut } from './ui/dropdown-menu';

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});


export default function Header() {
    const pathname = usePathname();
    const clickedProperties = "bg-zinc-600 text-white";
    const standardProperties = "px-6 py-2 rounded-4xl transition hover:dark:bg-white hover:dark:text-[#040710FF] hover:bg-[#040710FF] hover:text-white active:scale-95 transition-transform duration-100";
    const sideWidth = "w-80";
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                // console.log("INSIDE", session)
                setSession(session)
                setLoading(false)
            }
        )

        return () => listener.subscription.unsubscribe()
    }, [])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error)
        }
        router.push('/signin')
    }

    return (
        <header className="h-16 w-full flex items-stretch ">
            <div className={`flex items-center justify-start px-4 ${sideWidth} text-3xl`}>
                <Link href="/" className={outfit.className} style={{ fontWeight: 500 }}>
                    cinemania
                </Link>
            </div>

            <div className={`flex items-center justify-center flex-1 gap-12 ${outfit.className}`} style={{ fontWeight: 300 }}>
                <Search />
                <Link href="/discover" className={`${standardProperties} ${usePathname() === '/discover' ? clickedProperties : ''}`}>
                    Discover
                </Link>
                <Link href="/library" className={`${standardProperties} ${usePathname() === '/library' ? clickedProperties : ''}`}>
                    Library
                </Link>
                <Link href="/calendar" className={`${standardProperties} ${usePathname() === '/calendar' ? clickedProperties : ''}`}>
                    Calendar
                </Link>
                <Link href="/insights" className={`${standardProperties} ${usePathname() === '/insights' ? clickedProperties : ''}`}>
                    Insights
                </Link>
            </div>


            <div className={`flex items-center justify-end gap-4 px-4 ${sideWidth} ${outfit.className}`} style={{ fontWeight: 300 }}>
                {!loading && (
                    session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-transparent hover:dark:ring-white hover:ring-[#040710FF] transition">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-auto rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-[#040710FF]/60 bg-white/60 p-1 shadow-lg"
                                sideOffset={8}
                            >
                                <DropdownMenuItem
                                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                                    onClick={() => router.push('/profile')}
                                >
                                    My Account
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

                                <DropdownMenuItem
                                    className="rounded-md px-3 py-2 text-sm font-semibold text-red-600 hover:bg-muted"
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/signin"
                                className={`${standardProperties} border border-1 dark:border-white border-[#040710FF] ${usePathname() === '/signin' ? clickedProperties : ''}`}
                                style={{ fontWeight: 400 }}>Sign in
                            </Link>
                            <Link href="/signup"
                                className={`px-6 py-2 rounded-4xl transition active:scale-95 transition-transform duration-100 border border-1 border-[#94061eff] ${usePathname() === '/signup' ? "bg-[#94061eff] text-white" : ''}`}
                                style={{ fontWeight: 400 }}>Sign up
                            </Link>
                        </>
                    )
                )}
            </div>
        </header>
    );
}