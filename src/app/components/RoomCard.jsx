'use client'

import React from 'react';
import Link from 'next/link';
import { FiUsers, FiLayers, FiClock } from 'react-icons/fi';
import Image from 'next/image';

const RoomCard = ({ room }) => {
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

    const visibleAmenities = amenities.slice(0, 3);
    const extraCount = amenities.length - visibleAmenities.length;

    return (
        <div className="group flex flex-col rounded-2xl border border-[#3A2B22] bg-[#1E1A16] overflow-hidden transition-all duration-300 hover:border-[#8B5E3C]">

            {/* Image */}
            <div className="relative h-44 w-full overflow-hidden bg-[#231E1A]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={roomName || 'Room image'}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-5xl text-[#3A2B22]">
                        🏫
                    </div>
                )}

                {/* Floor badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-[#3A2B22] bg-[#1E1A16]/90 px-2.5 py-1 text-xs font-medium text-[#C8B6A6] backdrop-blur-sm">
                    <FiLayers className="text-[#8B5E3C]" />
                    {floor || 'N/A'}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">

                <h3 className="mb-1.5 text-base font-semibold text-[#F3E7DA] leading-snug line-clamp-1">
                    {roomName}
                </h3>

                <p className="mb-4 text-xs font-light leading-relaxed text-[#C8B6A6] line-clamp-2">
                    {description}
                </p>

                {/* Meta row */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#C8B6A6]">
                        <FiUsers className="text-[#8B5E3C]" />
                        {capacity} people
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#C8B6A6]">
                        <FiClock className="text-[#8B5E3C]" />
                        Hourly
                    </div>
                </div>

                {/* Amenity chips */}
                {amenities.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                        {visibleAmenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-full border border-[#3A2B22] bg-[#2A241F] px-2.5 py-1 text-[10px] font-medium text-[#C8B6A6]"
                            >
                                {amenity}
                            </span>
                        ))}
                        {extraCount > 0 && (
                            <span className="rounded-full border border-[#8B5E3C] bg-[#2A241F] px-2.5 py-1 text-[10px] font-medium text-[#8B5E3C]">
                                +{extraCount} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <span className="font-playfair text-2xl font-bold text-[#E0B07A]">
                            ${hourlyRate}
                        </span>
                        <span className="ml-1 text-xs font-light text-[#C8B6A6]">/hr</span>
                    </div>
                    <Link
                        href={`/rooms/${_id}`}
                        className="flex items-center gap-2 rounded-xl border border-[#5A4030] bg-[#221813] px-4 py-2 text-xs font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                    >
                        View Details
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RoomCard;