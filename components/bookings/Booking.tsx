import React from 'react';
import BookingTable from './BookingTable';

export default function Booking({ user, appointments }: any) {
    console.log({ user, appointments })
    return (
        <div className="p-2 max-w-5xl mx-auto">
            <h2 className="text-base font-bold mb-4 text-center">Appointment Bookings</h2>
            <BookingTable bookings={appointments} />
        </div>
    );
}
