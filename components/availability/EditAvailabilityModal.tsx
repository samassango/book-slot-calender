import React, { useState } from 'react';
import dayjs from 'dayjs';
import { createClient } from "@/lib/supabase/client";

interface Appointment {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string; // ISO format
    duration_hours: number;
}

interface Props {
    slot: Appointment;
    onClose: () => void;
    onUpdated: () => void;
}
const calculateHours = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime(); // milliseconds
    const diffHours = diffMs / (1000 * 60 * 60); // convert to hours

    return parseFloat(diffHours.toFixed(2)); // optional: round to 2 decimals
}

const formatDateToDatetimeLocal = (date: Date) => {
    if (!(date instanceof Date)) {
        throw new Error("Invalid Date object");
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format as 'YYYY-MM-DDTHH:mm'
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const EditAvailabilityModal: React.FC<Props> = ({ slot, onClose, onUpdated }) => {
    const [description, setDescription] = useState(slot.title);
    const [startDate, setStartDate] = useState(formatDateToDatetimeLocal(new Date(slot.start_date))); // datetime-local format
    const [duration, setDuration] = useState(calculateHours(slot.start_date, slot.end_date));
    const [loading, setLoading] = useState(false);

    const getEndDate = () => {
        const start = dayjs(startDate);
        const end = start.add(duration, 'hour');
        return end.format('YYYY-MM-DD HH:mm');
    }

    const handleUpdate = async () => {
        setLoading(true);
         const supabase = createClient();
        const { error } = await supabase
            .from('appointments')
            .update({
                title: description,
                start_date: new Date(startDate),
                end_date: new Date(getEndDate()),
            })
            .eq('id', slot.id);

        setLoading(false);
        if (error) {
            alert('Error updating slot: ' + error.message);
        } else {
            onUpdated();
            onClose();
        }
    };


console.log({slot})
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Appointment Slot</h2>

                <label className="block mb-2 text-sm font-medium">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                <label className="block mb-2 text-sm font-medium">Start Date & Time</label>
                <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                <label className="block mb-2 text-sm font-medium">Duration (hours)</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAvailabilityModal;
