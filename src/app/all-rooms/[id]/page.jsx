import React from 'react';
import { FiUsers, FiLayers, FiClock, FiWifi, FiMonitor, FiZap, FiWind } from 'react-icons/fi';
import { BsProjector } from 'react-icons/bs';
// import { MdOutlineQuietMode } from 'react-icons/md';
import Image from 'next/image';
import { CiCalendar } from 'react-icons/ci';
import { FaCalendar, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import EditModal from '@/app/components/EditModal';
import DeleteDialog from '@/app/components/DeleteDialog';

const amenityIcons = {
    'Wi-Fi': <FiWifi />,
    'Projector': <BsProjector />,
    'Whiteboard': <FiMonitor />,
    'Power Outlets': <FiZap />,
    // 'Quiet Zone': <MdOutlineQuietMode />,
    'Air Conditioning': <FiWind />,
};

const RoomDetailPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/room/${id}`);
    const room = await res.json();

    const {
        _id,
        roomName,
        description,
        imageUrl,
        floor,
        capacity,
        hourlyRate,
        amenities = [],
    } = room;

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">
            <EditModal room={room}/>
            <DeleteDialog room={room} />
            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* Eyebrow */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                    <span>🏫</span>
                    <span>ROOM DETAILS</span>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image */}
                        <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-[#3A2B22] bg-[#1E1A16] sm:h-96">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={roomName || 'Room image'}
                                    fill
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-7xl text-[#3A2B22]">
                                    🏫
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-[#3A2B22] bg-[#1E1A16]/90 px-3 py-1.5 text-xs font-medium text-[#C8B6A6] backdrop-blur-sm">
                                <FiLayers className="text-[#8B5E3C]" />
                                {floor || 'N/A'}
                            </div>
                        </div>

                        {/* Title + Meta */}
                        <div className="rounded-2xl border border-[#3A2B22] bg-[#1E1A16] p-6">
                            <h1 className="mb-3 text-3xl font-black leading-tight text-[#F7EBDD] sm:text-4xl">
                                {roomName}
                            </h1>

                            <div className="mb-5 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-[#C8B6A6]">
                                    <FiUsers className="text-[#8B5E3C]" />
                                    <span>{capacity} people</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#C8B6A6]">
                                    <FiLayers className="text-[#8B5E3C]" />
                                    <span>{floor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#C8B6A6]">
                                    <FiClock className="text-[#8B5E3C]" />
                                    <span>Hourly booking</span>
                                </div>
                            </div>

                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C]">
                                About this room
                            </div>
                            <p className="text-sm font-light leading-relaxed text-[#C8B6A6]">
                                {description}
                            </p>
                        </div>

                        {/* Amenities */}
                        {amenities.length > 0 && (
                            <div className="rounded-2xl border border-[#3A2B22] bg-[#1E1A16] p-6">
                                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C]">
                                    Amenities
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {amenities.map((amenity) => (
                                        <div
                                            key={amenity}
                                            className="flex items-center gap-3 rounded-xl border border-[#3A2B22] bg-[#2A241F] px-4 py-3 text-sm text-[#C8B6A6]"
                                        >
                                            <span className="text-[#E0B07A]">
                                                {amenityIcons[amenity] ?? '✦'}
                                            </span>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN — Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-2xl border border-[#4A3528] bg-[#1B1411] p-6 shadow-2xl">

                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8B5E3C]">
                                Hourly Rate
                            </div>
                            <div className="mb-6 flex items-end gap-1">
                                <span className="font-playfair text-4xl font-bold text-[#E0B07A]">${hourlyRate}</span>
                                <span className="mb-1 text-sm font-light text-[#C8B6A6]">/ hr</span>
                            </div>

                            <div className="mb-5 h-px w-full bg-[#3A2B22]" />

                            {/* <BookingForm roomId={_id} hourlyRate={hourlyRate} /> */}
                            <div>
                                <button className="w-full rounded-xl bg-[#E0B07A] px-6 py-3 font-semibold text-[#1B1411] hover:bg-[#D4A06A]">
                                    <span className='flex items-center justify-center gap-3'><FaCalendar /> Book Now</span>
                                </button>
                            </div>

                            <div className="flex justify-between gap-2 mt-3">
                                <label htmlFor="my_modal_7" className="w-full rounded-xl bg-transparent px-6 py-3 font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019]  border border-[#5A4030] cursor-pointer">
                                    <span className='flex items-center justify-center gap-3'><FaEdit /> Edit </span>
                                </label>
                                <label htmlFor="my_modal_8" className="w-full rounded-xl bg-transparent px-6 py-3 font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-red-500/10  border border-[#5A4030] cursor-pointer">
                                    <span className='flex items-center justify-center gap-3'><FaTrash /> Delete </span>
                                </label>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RoomDetailPage;