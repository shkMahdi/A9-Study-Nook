import React from 'react';
import RoomCard from '../components/RoomCard';
import ScrollToTop from '../components/ScrollToTop';

const AllRoomsPage = async () => {
    const res = await fetch('http://localhost:5000/room');
    const rooms = await res.json();
    console.log(rooms);
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">
            <ScrollToTop></ScrollToTop>
            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />


            <div className='text-center mb-5'>
                <h1 className="font-black leading-tight text-[#F7EBDD] text-4xl sm:text-5xl">
                    All {" "}
                    <span className="italic text-[#E0B07A]">
                        Study Rooms
                    </span>
                </h1>
                <p className="mt-1 text-sm leading-7 text-[#D8C1AD] sm:text-base ">
                    Browse the full catalog. Filter by amenity, price, or search by name.
                </p>
            </div>

            <div className="max-w-5xl mx-auto relative flex items-center justify-center py-1">
                <div className="absolute w-full border-t border-[#3B2B22]" />
            </div>

            <div className="max-w-7xl py-5 mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                ))}
            </div>



        </section>
    );
};

export default AllRoomsPage;