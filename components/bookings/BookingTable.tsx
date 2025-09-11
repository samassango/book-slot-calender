import React from 'react';

interface Booking {
  id: number;
  title: string;
  description: string;
  start_date: string; // ISO format
  end_date: string;   // ISO format
}

interface BookingTableProps {
  bookings: Booking[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="overflow-x-auto max-w-4xl mx-auto mt-6">
      <table className="min-w-full bg-gray-500 border border-gray-200 rounded shadow">
        <thead className="bg-gray-800">
          <tr>
            <th className="text-left px-4 py-2 border-b">Title</th>
            <th className="text-left px-4 py-2 border-b">Description</th>
            <th className="text-left px-4 py-2 border-b">Start Date</th>
            <th className="text-left px-4 py-2 border-b">End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{booking.title}</td>
              <td className="px-4 py-2 border-b">{booking.description}</td>
              <td className="px-4 py-2 border-b">
                {new Date(booking.start_date).toLocaleString()}
              </td>
              <td className="px-4 py-2 border-b">
                {new Date(booking.end_date).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
