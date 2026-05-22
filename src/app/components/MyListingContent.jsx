"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import RoomCard from '../components/RoomCard';
import ScrollToTop from '../components/ScrollToTop';
import Spinner from './Spinner';

const MyListingContent = () => {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        if (user?.email) {
            fetch(`http://localhost:5000/room/user/${user.email}`)
                .then(res => res.json())
                .then(data => setRooms(data));
        }

    }, [user]);

    console.log(rooms);
    if (isPending) {
        return <Spinner></Spinner>;
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">

            <ScrollToTop />

            <div className='text-center mb-5'>
                <h1 className="font-black leading-tight text-[#F7EBDD] text-4xl sm:text-5xl">
                    My{" "}
                    <span className="italic text-[#E0B07A]">
                        Listings
                    </span>
                </h1>
            </div>

            <div className="max-w-7xl py-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {rooms.map((room) => (
                    <RoomCard
                        key={room._id}
                        room={room}
                    />
                ))}

            </div>

        </section>
    );
};

export default MyListingContent;