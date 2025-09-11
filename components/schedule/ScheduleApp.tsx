'use client'

import React, { useState } from 'react';
import { LogoutButton } from '../logout-button';
import AppointmentBoard from './AppointmentBoard';
const ScheduleApp: React.FC<any> = ({ user, appointments }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   console.log({appointments})
    return (
        <div
            className="min-h-screen bg-cover bg-center text-gray-800"
            style={{ backgroundImage: "url('/images/background.png')" }} // Replace with your background image path
        >
            {/* Navbar */}
            <nav className="bg-white bg-opacity-90 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src='./images/AppointmentPro.png' alt="Logo" className="h-10 w-10" />
                        <span className="text-xl font-bold text-blue-600">SchedulerPro</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <a href="/schedule/appointment" className="hover:text-blue-500 mt-2">Appointment</a>
                        <a href="/schedule/availability" className="hover:text-blue-500 mt-2">Availability</a>
                        <a href="/schedule/bookings" className="hover:text-blue-500 mt-2">Bookings</a>
                        <div className="flex items-center  gap-4">
                            Hey, {user.email}!
                            <LogoutButton />
                        </div>
                    </div>
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-2">
                        <a href="/schedule/appointment" className="block hover:text-blue-500">Appointment</a>
                        <a href="/schedule/availability" className="block hover:text-blue-500">Availability</a>
                        <a href="/schedule/bookings" className="block hover:text-blue-500">Bookings</a>
                        <div className="flex items-center gap-4">
                            Hey, {user.email}!
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </nav>
            <main>
                <AppointmentBoard appointmentData={appointments}/>
            </main>
        </div>
    );
};

export default ScheduleApp;