"use client";

import { useEffect, useState } from "react";
import ScrollToTop from "./ScrollToTop";
import RoomCard from "./RoomCard";
import Link from "next/link";

const FEATURED_LIMIT = 6;

const FeaturedRooms = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/room")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRooms(data.slice(0, FEATURED_LIMIT));
                } else {
                    setRooms([]);
                }
            })
            .catch(() => setRooms([]));

    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD] border-t border-[#3A2B22]">
            <ScrollToTop></ScrollToTop>
            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />


            <div className='relative mx-auto max-w-7xl'>
                <div className="mb-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                        <span>📃</span>
                        <span>FEATURED ROOMS</span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight text-[#F7EBDD] sm:text-5xl">
                        Available{" "}
                        <span className="italic text-[#E0B07A]">
                            Rooms
                        </span>
                    </h1>
                    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                        <p className="mt-4 text-sm font-light leading-relaxed text-[#C8B6A6]">
                            Browse the full catalog. Filter by amenity, price, or search by name.
                        </p>
                        <Link
                            href="/all-rooms"
                            className="flex shrink-0 items-center gap-2 rounded-xl border border-[#5A4030] bg-[#221813] px-5 py-3 text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                        >
                            Browse Rooms →
                        </Link>
                    </div>

                </div>
            </div>

            <div className="relative max-w-7xl pb-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>



        </section>
    );
};

export default FeaturedRooms;