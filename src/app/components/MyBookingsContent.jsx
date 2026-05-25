"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ScrollToTop from "./ScrollToTop";
import Spinner from "./Spinner";
import CancelBookingDialog from "./CancelBookingDialog";

const formatDate = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const StatusBadge = ({ status }) => {
    const normalized = status?.toLowerCase() || "confirmed";
    const isCancelled = normalized === "cancelled";

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                isCancelled
                    ? "bg-red-500/15 text-red-400"
                    : "bg-[#8B5E3C]/25 text-[#E0B07A]"
            }`}
        >
            {normalized}
        </span>
    );
};

const MyBookingsContent = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [roomImages, setRoomImages] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    const fetchBookings = async (email) => {
        const [bookingsRes, roomsRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/user/${email}`),
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`),
        ]);

        const bookingsData = await bookingsRes.json();
        const roomsData = await roomsRes.json();

        const images = {};
        if (Array.isArray(roomsData)) { 
            roomsData.forEach((room) => {
                images[room._id] = room.imageUrl;
            });
        }

        setRoomImages(images);
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
    };

    useEffect(() => {
        if (!user?.email) {
            setBookings([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        fetchBookings(user.email).finally(() => setIsLoading(false));
    }, [user]);

    const openCancelModal = (booking) => {
        setBookingToCancel(booking);
        const modal = document.getElementById("cancel_booking_modal");
        if (modal) modal.checked = true;
    };

    if (isPending || isLoading) {
        return <Spinner />;
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">
            <CancelBookingDialog
                booking={bookingToCancel}
                onCancelled={() => user?.email && fetchBookings(user.email)}
            />
            <ScrollToTop />

            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-10">
                    <h1 className="font-playfair text-4xl font-black text-[#F7EBDD] sm:text-5xl">
                        My Bookings
                    </h1>
                    <p className="mt-2 text-sm font-light text-[#C8B6A6] sm:text-base">
                        Manage your upcoming and past room reservations.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-2xl border border-[#3B2B22] bg-[#1B1411]/95 p-10 text-center shadow-lg">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                            <span>📅</span>
                            <span>NO BOOKINGS YET</span>
                        </div>
                        <p className="font-playfair text-2xl font-bold text-[#F7EBDD]">
                            You have no reservations
                        </p>
                        <p className="mx-auto mt-2 max-w-md text-sm font-light text-[#D8C1AD]">
                            Browse available rooms and book your first study session.
                        </p>
                        <Link
                            href="/all-rooms"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#5A4030] bg-[#221813] px-5 py-3 text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                        >
                            Browse Rooms →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-[#3B2B22] bg-[#1B1411]/95 shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-180 text-left text-sm">
                                <thead>
                                    <tr className="border-b border-[#3B2B22] text-[10px] font-semibold uppercase tracking-widest text-[#8B5E3C]">
                                        <th className="px-6 py-4">Room</th>
                                        <th className="px-4 py-4">Date</th>
                                        <th className="px-4 py-4">Time</th>
                                        <th className="px-4 py-4">Cost</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => {
                                        const imageUrl = roomImages[booking.roomId];
                                        const isCancelled =
                                            booking.status?.toLowerCase() === "cancelled";

                                        return (
                                            <tr
                                                key={String(booking._id)}
                                                className="border-b border-[#3B2B22]/60 last:border-b-0 transition-colors hover:bg-[#221813]/50"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#3B2B22] bg-[#231E1A]">
                                                            {imageUrl ? (
                                                                <Image
                                                                    src={imageUrl}
                                                                    alt={booking.roomName}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="48px"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-lg text-[#3B2B22]">
                                                                    🏫
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="font-medium text-[#F7EBDD]">
                                                            {booking.roomName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-[#C8B6A6]">
                                                    {formatDate(booking.date)}
                                                </td>
                                                <td className="px-4 py-4 text-[#C8B6A6]">
                                                    {booking.startTime} – {booking.endTime}
                                                </td>
                                                <td className="px-4 py-4 font-medium text-[#F7EBDD]">
                                                    ${booking.totalCost}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge status={booking.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {isCancelled ? (
                                                        <span className="text-[#5A4030]">—</span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => openCancelModal(booking)}
                                                            className="text-xs font-semibold text-red-400 transition-colors hover:text-red-300"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyBookingsContent;
