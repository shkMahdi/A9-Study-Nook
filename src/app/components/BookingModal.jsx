'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const TIME_SLOTS = [
    '06:00','07:00','08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00','22:00', '23:00'
];

const BookingModal = ({ room }) => {
    const { data: session, isPending } = authClient.useSession()
    // if (isPending) return null;
    const user = session?.user;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [totalCost, setTotalCost] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm();

    const startTime = watch('startTime');
    const endTime = watch('endTime');

    const availableEndSlots = startTime
        ? TIME_SLOTS.filter(t => t > startTime)
        : [];

    useEffect(() => {
        if (startTime && endTime && endTime > startTime) {
            const hours = parseInt(endTime) - parseInt(startTime);
            setTotalCost(hours * room?.hourlyRate);
        } else {
            setTotalCost(0);
        }
    }, [startTime, endTime, room?.hourlyRate]);

    const today = new Date().toISOString().split('T')[0];

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const bookingData = {
                roomId: room._id,
                roomName: room.roomName,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                totalCost,
                note: data.note || '',
                userEmail: user.email,
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bookingData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || result.message || 'Failed to book room');
            }

            toast.success('Room booked successfully!');
            reset();
            setTotalCost(0);
            document.getElementById('my_modal_9').checked = false;
            router.push('/my-bookings');

        } catch (error) {
            toast.error(error.message || 'Failed to book room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input type="checkbox" id="my_modal_9" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-md border border-[#4A3528] bg-[#1B1411]">

                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full border border-[#4A3528] bg-[#211611] p-4">
                            <FiCalendar className="text-2xl text-[#E0B07A]" />
                        </div>
                    </div>

                    {/* Header */}
                    <h3 className="mb-1 text-center text-xl font-black text-[#F7EBDD]">
                        Book this Room
                    </h3>
                    <p className="mb-1 text-center text-sm font-semibold text-[#E0B07A]">
                        {room?.roomName}
                    </p>
                    <p className="mb-6 text-center text-xs text-[#8B5E3C]">
                        ${room?.hourlyRate}/hr · Fill in your preferred slot below
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Date */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Date
                            </label>
                            <input
                                type="date"
                                min={today}
                                {...register('date', { required: true })}
                                className="h-11 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-4 text-sm text-[#F7EBDD] outline-none transition-all duration-300 focus:border-[#E0B07A] [color-scheme:dark]"
                            />
                        </div>

                        {/* Start + End Time */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    Start Time
                                </label>
                                <select
                                    {...register('startTime', { required: true })}
                                    className="h-11 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-3 text-sm text-[#F7EBDD] outline-none transition-all duration-300 focus:border-[#E0B07A]"
                                >
                                    <option value="">From</option>
                                    {TIME_SLOTS.slice(0, -1).map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                    End Time
                                </label>
                                <select
                                    {...register('endTime', { required: true })}
                                    disabled={!startTime}
                                    className="h-11 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-3 text-sm text-[#F7EBDD] outline-none transition-all duration-300 focus:border-[#E0B07A] disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <option value="">To</option>
                                    {availableEndSlots.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Special Note */}
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                                Special Note
                                <span className="ml-1 normal-case text-[#8B5E3C]">(optional)</span>
                            </label>
                            <textarea
                                {...register('note')}
                                placeholder="Any requests or notes..."
                                rows={2}
                                className="w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-4 py-2.5 text-sm text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A] resize-none"
                            />
                        </div>

                        {/* Total Cost */}
                        <div className="flex items-center justify-between rounded-xl border border-[#4A3528] bg-[#221813] px-4 py-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C]">
                                Total Cost
                            </span>
                            <span className="text-2xl font-bold text-[#E0B07A]">
                                ${totalCost}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-1">
                            <label
                                htmlFor="my_modal_9"
                                className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019]"
                                style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                            >
                                Cancel
                            </label>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-10 flex-[2] items-center justify-center gap-2 rounded-lg border border-[#5A4030] bg-[#221813] text-xs font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <span className="inline-block animate-spin">⏳</span>
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        <FiArrowRight className="text-[#E0B07A]" />
                                        Confirm Booking
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_9">Close</label>
            </div>
        </>
    );
};

export default BookingModal;