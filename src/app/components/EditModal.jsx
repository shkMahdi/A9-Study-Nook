'use client';

import React, { useState } from 'react';
import { FiArrowRight } from "react-icons/fi";

const AMENITIES = [
    { id: 'whiteboard', label: 'Whiteboard', icon: '🖊️' },
    { id: 'projector', label: 'Projector', icon: '📽️' },
    { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { id: 'power_outlets', label: 'Power Outlets', icon: '🔌' },
    { id: 'quiet_zone', label: 'Quiet Zone', icon: '🤫' },
    { id: 'air_conditioning', label: 'Air Conditioning', icon: '❄️' },
];

const EditModal = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const toggleAmenity = (label) => {
        setSelectedAmenities(prev =>
            prev.includes(label)
                ? prev.filter(a => a !== label)
                : [...prev, label]
        );
    };

    return (
        <>  
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-lg bg-[#1B1411] border border-[#4A3528]">
                    
                    {/* Header */}
                    <h3 className="text-2xl font-black text-[#F7EBDD] mb-6">Edit Room</h3>

                    {/* Form */}
                    <form className="space-y-4">

                        {/* Room Name */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Room Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. The Quiet Corner"
                                className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Description
                            </label>
                            <textarea
                                placeholder="Describe your room..."
                                rows={3}
                                className="w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 py-2 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A] resize-none"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Image URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/room.jpg"
                                className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                            />
                        </div>

                        {/* Floor + Capacity */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Floor
                                </label>
                                <input
                                    type="text"
                                    placeholder="3rd Floor"
                                    className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    placeholder="4"
                                    className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                        </div>

                        {/* Hourly Rate */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Hourly Rate (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#E0B07A]">$</span>
                                <input
                                    type="number"
                                    placeholder="5"
                                    className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] pl-8 pr-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Amenities
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {AMENITIES.map(({ id, label, icon }) => {
                                    const isSelected = selectedAmenities.includes(label);
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => toggleAmenity(label)}
                                            className={`flex items-center gap-1 rounded-lg border px-2 py-2 text-xs font-medium transition-all duration-200 ${isSelected
                                                    ? 'border-[#E0B07A] bg-[#2D2019] text-[#E0B07A]'
                                                    : 'border-[#5A4030] bg-[#2A241F] text-[#C8B6A6] hover:border-[#8B5E3C]'
                                                }`}
                                        >
                                            <span>{icon}{"  "}{label}</span>
                                            {isSelected && <span>✓</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="my-4 border-t border-[#3B2B22]" />

                        {/* Actions */}
                        <div className="flex gap-3">
                            <label
                                htmlFor="my_modal_7"
                                className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019] cursor-pointer"
                            >
                                Cancel
                            </label>
                            <button
                                type="submit"
                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#5A4030] bg-[#221813] text-xs font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019]"
                            >
                                <FiArrowRight className="text-[#E0B07A]" />
                                Save
                            </button>
                        </div>

                    </form>

                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    );
};

export default EditModal;