'use server';

import { revalidatePath } from 'next/cache';

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
