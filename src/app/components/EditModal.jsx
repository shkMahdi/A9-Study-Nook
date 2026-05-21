'use client';

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import { updateRoom } from '@/app/actions/roomActions';

const AMENITIES = [
    { id: 'whiteboard', label: 'Whiteboard', icon: '🖊️' },
    { id: 'projector', label: 'Projector', icon: '📽️' },
    { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
    { id: 'power_outlets', label: 'Power Outlets', icon: '🔌' },
    { id: 'quiet_zone', label: 'Quiet Zone', icon: '🤫' },
    { id: 'air_conditioning', label: 'Air Conditioning', icon: '❄️' },
];

const EditModal = ({ room }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            roomName: room?.roomName || '',
            description: room?.description || '',
            imageUrl: room?.imageUrl || '',
            floor: room?.floor || '',
            capacity: room?.capacity || '',
            hourlyRate: room?.hourlyRate || '',
        }
    });
    const [selectedAmenities, setSelectedAmenities] = useState(room?.amenities || []);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const toggleAmenity = (label) => {
        setSelectedAmenities(prev =>
            prev.includes(label)
                ? prev.filter(a => a !== label)
                : [...prev, label]
        );
    };

    const onSubmit = async (formData) => {
        setLoading(true);
        setMessage('');

        try {
            const updateData = {
                ...formData,
                amenities: selectedAmenities,
                capacity: parseInt(formData.capacity),
                hourlyRate: parseFloat(formData.hourlyRate),
            };

            const result = await updateRoom(room._id, updateData);

            if (!result.success) {
                throw new Error(result.error || 'Failed to update room');
            }

            setMessage('Room updated successfully!');
            setTimeout(() => {
                document.getElementById('my_modal_7').checked = false;
                setMessage('');
            }, 1500);
        } catch (error) {
            setMessage('Error updating room: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>  
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-lg bg-[#1B1411] border border-[#4A3528]">
                    
                    {/* Header */}
                    <h3 className="text-2xl font-black text-[#F7EBDD] mb-6">Edit Room</h3>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Room Name */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Room Name
                            </label>
                            <input
                                type="text"
                                {...register("roomName")}
                                className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Description
                            </label>
                            <textarea
                                {...register("description")}
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
                                {...register("imageUrl")}
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
                                    {...register("floor")}
                                    className="h-10 w-full rounded-lg border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    {...register("capacity")}
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
                                    {...register("hourlyRate")}
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

                        {/* Message */}
                        {message && (
                            <div className={`rounded-lg px-4 py-2 text-xs font-semibold text-center ${
                                message.includes('Error') 
                                    ? 'bg-red-500/20 text-red-400' 
                                    : 'bg-green-500/20 text-green-400'
                            }`}>
                                {message}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <label
                                htmlFor="my_modal_7"
                                className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019] cursor-pointer disabled:opacity-50"
                                style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                            >
                                Cancel
                            </label>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-[#5A4030] bg-[#221813] text-xs font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="inline-block animate-spin">⏳</span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiArrowRight className="text-[#E0B07A]" />
                                        Save
                                    </>
                                )}
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