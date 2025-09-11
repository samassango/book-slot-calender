import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const getAppointmentURL = (userId: string) => `${window.location.host}/appointment/${userId}`

const BookingPopup = ({ userId }: { userId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const bookingUrl = getAppointmentURL(userId);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 ml-4 py-2 bg-green-500 hover:bg-green-800 text-white font-medium rounded shadow transition duration-300"
            >
                Show QR Code
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all scale-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan to Make Appointment</h2>
                        <div className="flex justify-center mb-4">
                            <QRCodeSVG value={bookingUrl} size={180} />
                        </div>
                        <p className="text-sm text-gray-600 mb-6">{bookingUrl}</p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingPopup;
