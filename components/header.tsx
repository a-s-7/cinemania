import Link from "next/link";
import { Outfit } from "next/font/google";

import { Search } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Header() {
    return (
        <header className="h-16 w-full flex items-stretch">
            <div className="flex items-center justify-start px-4 w-40 text-3xl">
                <Link href="/" className={outfit.className} style={{ fontWeight: 500 }}>
                    cinemania
                </Link>
            </div>

            <div className={`flex items-center justify-center flex-1 gap-12 ${outfit.className}`} style={{ fontWeight: 300 }}>
                <Search />
                <Link href="/discover" className="px-4 py-2 rounded-3xl transition hover:bg-red-700/20">
                    Discover
                </Link>
                <Link href="/library" className="px-4 py-2 rounded-3xl transition hover:bg-red-700/20">
                    Library
                </Link>
                <Link href="/calendar" className="px-4 py-2 rounded-3xl transition hover:bg-red-700/20">
                    Calendar
                </Link>
                <Link href="/insights" className="px-4 py-2 rounded-3xl transition hover:bg-red-700/20">
                    Insights
                </Link>
            </div>


            <div className={`flex items-center justify-end px-4 w-40 ${outfit.className}`} style={{ fontWeight: 300 }}>
                <Link href="/profile">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
}