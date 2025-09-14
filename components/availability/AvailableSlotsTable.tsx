
import React, { useState } from 'react';
import BookingPopup from './AppointmentQRCode';

export interface IAppointment {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  is_available: boolean;
}

export interface IAvailableSlot {
  availableAppointment: IAppointment[];
  userId: string;
  onCreateDialog: () => void;
  onSelectedAppointment: (appointment: IAppointment) => void;
  onEditAppointment: (appointment: IAppointment) => void;
}

const AvailableSlotsTable: React.FC<IAvailableSlot> = ({
  onCreateDialog,
  onSelectedAppointment,
  onEditAppointment,
  availableAppointment,
  userId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = availableAppointment?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = availableAppointment ? Math.ceil(availableAppointment.length / rowsPerPage) : 0;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3 sm:gap-5 mb-6">
        <BookingPopup userId={userId} />
        <button
          onClick={onCreateDialog}
          className='w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition'
        >
          Create Availability
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-gray-500 border border-gray-300 rounded shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left px-3 py-2 text-sm sm:text-base border-b">Title</th>
              <th className="text-left px-3 py-2 text-sm sm:text-base border-b">Start Date</th>
              <th className="text-left px-3 py-2 text-sm sm:text-base border-b">End Date</th>
              <th className="px-3 py-2 text-sm sm:text-base border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-100">
                <td className="px-3 py-2 border border-gray-300">{slot.title}</td>
                <td className="px-3 py-2 border border-gray-300">{slot.start_date}</td>
                <td className="px-3 py-2 border border-gray-300">{slot.end_date}</td>
                <td className="px-3 py-2 border border-gray-300 flex flex-wrap gap-2 justify-start">
                  <button
                    onClick={() => onEditAppointment(slot)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onSelectedAppointment(slot)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white hover:bg-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AvailableSlotsTable;


// import React, { useState } from 'react';
// import BookingPopup from './AppointmentQRCode';
// export interface IAppointment {
//     id: string;
//     title: string;
//     start_date: string;
//     end_date: string;
//     is_available: boolean;
// }
// export interface IAvailableSlot {
//     availableAppointment: IAppointment[];
//     userId: string;
//     onCreateDialog: () => void;
//     onSelectedAppointment: (appointment: IAppointment) => void;
//     onEditAppointment: (appointment: IAppointment) => void;
// }

// const AvailableSlotsTable: React.FC<any> = ({ onCreateDialog, onSelectedAppointment, onEditAppointment, availableAppointment, userId }: IAvailableSlot) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 8;

//     const indexOfLastRow = currentPage * rowsPerPage;
//     const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//     const currentRows = availableAppointment && availableAppointment.slice(indexOfFirstRow, indexOfLastRow);
//     const totalPages = availableAppointment && Math.ceil(availableAppointment.length / rowsPerPage);
//     console.log({ availableAppointment })
//     return (
//         <div className="w-full">
//             {/* Create Button Row */}
//             <div className="flex justify-end mb-4 gap-5">
//                 <BookingPopup userId={userId} />
//                 <button onClick={onCreateDialog} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
//                     Create Availability
//                 </button>
//             </div>

//             {/* Table */}
//             <table className="w-full table-auto border-collapse bg-gray-500 border border-gray-200 rounded shadow">
//                 <thead className="text-white bg-gray-800">
//                     <tr>
//                         <th className="text-left px-4 py-2 border-b">Title</th>
//                         <th className="text-left px-4 py-2 border-b">Start Date</th>
//                         <th className="text-left px-4 py-2 border-b">End Date</th>
//                         <th className="px-4 py-2 border border-gray-800  space-x-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentRows && currentRows.map((slot) => (
//                         <tr key={slot.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 border border-gray-300 rounded-md">{slot.title}</td>
//                             <td className="px-4 py-2 border border-gray-300 rounded-md">{slot.start_date}</td>
//                             <td className="px-4 py-2 border border-gray-300 rounded-md">{slot.end_date}</td>
//                             <td className="px-4 py-2 border border-gray-300 rounded-md space-x-2">
//                                 <button onClick={() => onEditAppointment(slot)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                                     </svg>
//                                 </button>
//                                 <button onClick={() => onSelectedAppointment(slot)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                                     </svg>
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-4 space-x-2">
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-700"
//                     disabled={currentPage === 1}
//                 >
//                     Prev
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                         key={i}
//                         onClick={() => setCurrentPage(i + 1)}
//                         className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-500 hover:bg-gray-700'
//                             }`}
//                     >
//                         {i + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-700"
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AvailableSlotsTable;
