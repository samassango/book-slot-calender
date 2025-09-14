
import BookingCalendar from '@/components/appointment/BookingCalendar';
import Image from 'next/image';
import React from 'react';

export default function Appointments() {
    return (
        <div
            className="min-h-screen w-full flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(/images/background.png)` }}
        >
            {/* Navigation */}
            <nav className="bg-white bg-opacity-90 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Image src='/images/AppointmentPro.png' width={50} height={30} alt="Logo" />
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">SchedulerPro</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 md:px-10 py-6">
                <div className="w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl h-[100%]">
                    <BookingCalendar />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full text-center py-4 text-sm text-white bg-black bg-opacity-60">
                Copyright © 2025. Designed & Developed by <span className="font-semibold">Samassango</span>
            </footer>
        </div>
    );
}
