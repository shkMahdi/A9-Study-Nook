"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { authClient } from '@/lib/auth-client';
import RoomCard from '../components/RoomCard';
import ScrollToTop from '../components/ScrollToTop';
import Spinner from './Spinner';
import { MdPlaylistRemove } from "react-icons/md";
import { RouterServerContextSymbol } from 'next/dist/server/lib/router-utils/router-server-context';

const MyListingContent = () => {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!user?.email) {
            setRooms([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        fetch(`http://localhost:5000/room/user/${user.email}`)
            .then(res => res.json())
            .then(data => setRooms(data))
            .finally(() => setIsLoading(false));

    }, [user]);

    if (isPending || isLoading) {
        return <Spinner></Spinner>;
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">

            <ScrollToTop />

            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />

            {
                rooms.length > 0 && (
                    <div className='text-center mb-5'>
                        <h1 className="font-black leading-tight text-[#F7EBDD] text-4xl sm:text-5xl">
                            My{" "}
                            <span className="italic text-[#E0B07A]">
                                Listings
                            </span>
                        </h1>
                    </div>
                )
            }


            {rooms.length === 0 ? (
                <div className=" max-w-4xl py-5 mx-auto border border-[#3B2B22] rounded-lg p-5 shadow-lg backdrop-blur-sm bg-[#1B1411]/95">
                    <div className="relative z-10 mx-auto max-w-2xl text-center py-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                            <span>📋</span>
                            <span>EMPTY LISTINGS</span>
                        </div>
                        <div className="text-8xl text-[#E0B07A]/70 flex justify-center items-center">
                            <MdPlaylistRemove />
                        </div>
                        <p className="font-bold text-3xl font-playfair">No listings yet</p>
                        <p className="text-[#D8C1AD] text-sm leading-8 max-w-xl mx-auto font-light">
                            Got a room? List it and start earning.
                        </p>

                        <div className="mt-10 flex flex-row sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/all-rooms"
                                className="flex shrink-0 items-center gap-2 rounded-xl border border-[#5A4030] bg-[#221813] px-5 py-3 text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                            >
                                Brows Rooms →
                            </Link>
                            <Link
                                href="/add-roomm"
                                className="flex shrink-0 items-center gap-2 rounded-xl border border-[#5A4030] bg-[#E0B07A]/50 px-5 py-3 text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                            >
                                Add Room →
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 max-w-7xl py-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room._id}
                            room={room}
                        />
                    ))}
                </div>
            )}

        </section>
    );
};

export default MyListingContent;