'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const DeleteDialog = ({ room }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        const modal = document.getElementById('my_modal_8');
        if (modal) modal.checked = false;
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/room/${room._id}`,
                { method: 'DELETE' }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || result.message || 'Failed to delete room');
            }

            toast.success('Room deleted successfully!');
            closeModal();
            router.push('/all-rooms');
        } catch (error) {
            toast.error(error.message || 'Failed to delete room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-md border border-[#4A3528] bg-[#1B1411]">

                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-red-500/20 p-4">
                            <FaTrash className="text-2xl text-red-400" />
                        </div>
                    </div>

                    <h3 className="mb-2 text-center text-xl font-black text-[#F7EBDD]">
                        Delete Room?
                    </h3>

                    <div className="mb-6 space-y-2 text-center">
                        <p className="text-sm text-[#C8B6A6]">
                            Are you sure you want to delete
                        </p>
                        <p className="text-sm font-bold text-[#E0B07A]">
                            {room?.roomName}
                        </p>
                        <p className="text-xs text-[#8B5E3C]">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <label
                            htmlFor="my_modal_8"
                            className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019]"
                            style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                        >
                            Cancel
                        </label>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/20 text-xs font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="inline-block animate-spin">⏳</span>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <FaTrash />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>

                </div>
                <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
            </div>
        </>
    );
};

export default DeleteDialog;
