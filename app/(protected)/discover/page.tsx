'use client'

import { useState } from "react";
import { useEffect } from "react";

export default function Discover() {
    const [items, setItems] = useState<any>();

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/discover?pages=10');
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.log(error);
            }
        }

        load();
    }, []);


    return (
        <div className="flex flex-col flex-1">
            <div className="grid grid-cols-2 md:grid-cols-11 gap-6 p-4">
                {items?.map((item: any) => (
                    <img
                        key={item.id}
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        className="w-full rounded-xl border shadow-lg hover:cursor-pointer hover:scale-110 transition-all duration-300"
                    />
                ))}
            </div>
        </div>
    );
}