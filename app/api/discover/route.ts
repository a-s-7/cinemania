import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const numPages = Number(searchParams.get("pages") ?? "1");
    let allResults: any[] = [];

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    for (let i = 1; i <= numPages; i++) {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${i}`, options);
        const data = await res.json();
        allResults = [...allResults, ...data.results];
    }

    return NextResponse.json(allResults);
}