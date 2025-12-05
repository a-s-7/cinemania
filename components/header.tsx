import Link from "next/link";
import { Search } from "lucide-react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"


export default function Header() {
    return (
        <header className="h-16 w-full flex items-stretch">
            <div className="flex items-center justify-center w-60 bg-red-400">
                <Link href="/">
                    Cinemania
                </Link>
            </div>

            <div className="flex items-center justify-end flex-1 bg-red-300 gap-12 pr-12">
                <Link href="/discover">
                    Discover
                </Link>
                <Link href="/library">
                    Library
                </Link>
            </div>

            <div className="flex items-center justify-center w-120">
                <InputGroup className="w-100 rounded-full h-12">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
                </InputGroup>
            </div>

            <div className="flex items-center justify-start flex-1 bg-red-300 gap-12 pl-12">
                <Link href="/calendar">
                    Calendar
                </Link>
                <Link href="/insights">
                    Insights
                </Link>
            </div>

            <div className="flex items-center justify-center w-60 bg-green-400">
                <Link href="/profile">
                    Profile
                </Link>
            </div>
        </header>
    );
}