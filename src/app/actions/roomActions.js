'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateRoom(roomId, updateData) {
    try {
        const response = await fetch(`http://localhost:5000/room/${roomId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error('Failed to update room');
        }

        revalidatePath(`/all-rooms/${roomId}`);

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteRoom(roomId) {
    try {
        const response = await fetch(`http://localhost:5000/room/${roomId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete room');
        }

        revalidatePath('/all-rooms');
        redirect('/all-rooms');

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
