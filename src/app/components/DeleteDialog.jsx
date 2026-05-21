'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';

const DeleteDialog = ({ room }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = async () => {

        setLoading(true);
        setMessage('');

        try {

            const res = await fetch(
                `http://localhost:5000/room/${room._id}`,
                {
                    method: 'DELETE',
                }
            );

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to delete room');
            }

            setMessage('Room deleted successfully!');

            setTimeout(() => {
                router.push('/all-rooms');
            }, 1000);

        } catch (error) {

            setMessage('Error deleting room: ' + error.message);

        } finally {

            setLoading(false);

        }
    };


    return (
        <>
            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-md bg-[#1B1411] border border-[#4A3528]">

                    {/* Warning Icon */}
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-red-500/20 p-4">
                            <FaTrash className="text-2xl text-red-400" />
                        </div>
                    </div>

                    {/* Header */}
                    <h3 className="mb-2 text-center text-xl font-black text-[#F7EBDD]">
                        Delete Room?
                    </h3>

                    {/* Confirmation Message */}
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

                    {/* Message */}
                    {message && (
                        <div className={`mb-4 rounded-lg px-4 py-2 text-xs font-semibold text-center ${message.includes('Error')
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-green-500/20 text-green-400'
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <label
                            htmlFor="my_modal_8"
                            className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[#5A4030] bg-transparent text-xs font-semibold text-[#C8B6A6] transition-all duration-300 hover:bg-[#2D2019] cursor-pointer"
                            style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                        >
                            Cancel
                        </label>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/20 text-xs font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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