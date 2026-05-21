'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import toast from 'react-hot-toast';

const AMENITIES = [
    { id: 'whiteboard', label: 'Whiteboard', icon: '🖊️' },
    { id: 'projector', label: 'Projector', icon: '📽️' },
    { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { id: 'power_outlets', label: 'Power Outlets', icon: '🔌' },
    { id: 'quiet_zone', label: 'Quiet Zone', icon: '🤫' },
    { id: 'air_conditioning', label: 'Air Conditioning', icon: '❄️' },
];

const AddRoomPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const toggleAmenity = (label) => {
        setSelectedAmenities(prev =>
            prev.includes(label)
                ? prev.filter(a => a !== label)
                : [...prev, label]
        );
    };

    const onSubmit = async (roomData) => {
        const finalData = { 
            ...roomData, 
            amenities: selectedAmenities 
        };
        console.log('Sending room data:', finalData);

        try {
            const response = await fetch('http://localhost:5000/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response from server:', data);
            toast.success('Room added successfully!');
        } catch (error) {
            console.error('Error adding room:', error);
            toast.error('Error adding room. Check console for details.');
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">

            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 mx-auto w-full max-w-2xl">

                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                        <span>🏫</span>
                        <span>ROOM LISTING</span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight text-[#F7EBDD] sm:text-5xl">
                        List a{" "}
                        <span className="italic text-[#E0B07A]">Room</span>
                    </h1>
                    <p className="mt-3 text-sm leading-7 text-[#D8C1AD]">
                        Fill in the details to make your room available for booking
                    </p>
                </div>

                <div className="rounded-3xl border border-[#4A3528] bg-[#1B1411]/95 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Room Name */}
                        <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Room Name <span className="text-[#E0B07A]">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("roomName", { required: "Room name is required" })}
                                placeholder="e.g. The Quiet Corner"
                                className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                            />
                            {errors.roomName && (
                                <p className="mt-2 text-xs text-red-400">{errors.roomName.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Description <span className="text-[#E0B07A]">*</span>
                            </label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                placeholder="Describe your room - ambiance, equipment, rules..."
                                rows={4}
                                className="w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 py-3 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A] resize-none"
                            />
                            {errors.description && (
                                <p className="mt-2 text-xs text-red-400">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Image URL
                            </label>
                            <input
                                type="url"
                                {...register("imageUrl")}
                                placeholder="https://example.com/room-photo.jpg"
                                className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                            />
                        </div>

                        {/* Floor + Capacity */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Floor
                                </label>
                                <input
                                    type="text"
                                    {...register("floor")}
                                    placeholder="e.g. 3rd Floor"
                                    className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    {...register("capacity", { min: 1 })}
                                    placeholder="e.g. 4"
                                    className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Hourly Rate (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#E0B07A]">$</span>
                                <input
                                    type="number"
                                    {...register("hourlyRate", { min: 0 })}
                                    placeholder="e.g. 5"
                                    className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] pl-9 pr-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Amenities
                            </label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {AMENITIES.map(({ id, label, icon }) => {
                                    const isSelected = selectedAmenities.includes(label);
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => toggleAmenity(label)}
                                            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${isSelected
                                                    ? 'border-[#E0B07A] bg-[#2D2019] text-[#E0B07A]'
                                                    : 'border-[#5A4030] bg-[#2A241F] text-[#C8B6A6] hover:border-[#8B5E3C] hover:text-[#F7EBDD]'
                                                }`}
                                        >
                                            <span>{icon}</span>
                                            <span>{label}</span>
                                            {isSelected && <span className="ml-auto text-xs">✓</span>}
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedAmenities.length > 0 && (
                                <p className="mt-2 text-xs text-[#8B5E3C]">
                                    Selected: {selectedAmenities.join(', ')}
                                </p>
                            )}
                        </div>

                        <div className="relative flex items-center justify-center py-1">
                            <div className="absolute w-full border-t border-[#3B2B22]" />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Link
                                href="/my-listings"
                                className="flex h-12 flex-1 items-center justify-center rounded-xl border border-[#5A4030] bg-transparent text-sm font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019] hover:text-[#F7EBDD]"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="flex h-12 flex-2 items-center justify-center gap-3 rounded-xl border border-[#5A4030] bg-[#221813] text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019]"
                            >
                                <FiArrowRight className="text-lg text-[#E0B07A]" />
                                Add Room
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddRoomPage;