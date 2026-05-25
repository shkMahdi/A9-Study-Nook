'use client';

import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const formatDate = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

const CancelBookingDialog = ({ booking, onCancelled }) => {
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        const modal = document.getElementById('cancel_booking_modal');
        if (modal) modal.checked = false;
    };

    const handleConfirmCancel = async () => {
        if (!booking?._id) return;

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${String(booking._id)}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'cancelled' }),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(
                    result.error || result.message || 'Failed to cancel booking'
                );
            }

            toast.success('Reservation cancelled successfully!');
            onCancelled?.();
            closeModal();
        } catch (error) {
            toast.error(error.message || 'Failed to cancel booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input type="checkbox" id="cancel_booking_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-md border border-[#4A3528] bg-[#1B1411]">

                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-red-500/20 p-4">
                            <FiCalendar className="text-2xl text-red-400" />
                        </div>
                    </div>

                    <h3 className="mb-2 text-center text-xl font-black text-[#F7EBDD]">
                        Cancel Reservation?
                    </h3>

                    <div className="mb-6 space-y-2 text-center">
                        <p className="text-sm text-[#C8B6A6]">
                            Are you sure you want to cancel your booking for
                        </p>
                        <p className="text-sm font-bold text-[#E0B07A]">
                            {booking?.roomName}
                        </p>
                        {booking?.date && (
                            <p className="text-xs text-[#8B5E3C]">
                                {formatDate(booking.date)} · {booking.startTime} –{' '}
                                {booking.endTime}
                            </p>
                        )}
                        <p className="text-xs text-[#8B5E3C]">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <label
                            htmlFor="cancel_booking_modal"
                            className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019]"
                            style={{
                                pointerEvents: loading ? 'none' : 'auto',
                                opacity: loading ? 0.5 : 1,
                            }}
                        >
                            Keep Reservation
                        </label>
                        <button
                            type="button"
                            onClick={handleConfirmCancel}
                            disabled={loading || !booking}
                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/20 text-xs font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="inline-block animate-spin">⏳</span>
                                    Cancelling...
                                </>
                            ) : (
                                'Yes, Cancel'
                            )}
                        </button>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="cancel_booking_modal">
                    Close
                </label>
            </div>
        </>
    );
};

export default CancelBookingDialog;
