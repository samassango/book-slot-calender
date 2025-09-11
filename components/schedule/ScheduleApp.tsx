'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LogoutButton } from '../logout-button';
import AppointmentBoard from './AppointmentBoard';

const ScheduleApp: React.FC<any> = ({ user, appointments }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log({ appointments })
    return (
        <div
            className="min-h-screen bg-cover bg-center text-gray-800"
            style={{ backgroundImage: "url('/images/background.png')" }} // Replace with your background image path
        >
            {/* Navbar */}
            <nav className="bg-white bg-opacity-90 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Image src='/images/AppointmentPro.png' width={50} height={30} alt="Logo" />
                        <span className="text-xl font-bold text-blue-600">SchedulerPro</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <Link href="/schedule/appointment">
                            <span className="hover:text-blue-500 mt-2">Appointment</span>
                        </Link>
                        <Link href="/schedule/availability">
                            <span className="hover:text-blue-500 mt-2">Availability</span>
                        </Link>

                        <Link href="/schedule/bookings">
                            <span className="hover:text-blue-500 mt-2">Bookings</span>
                        </Link>

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
                        <Link href="/schedule/appointment">
                            <span className="block hover:text-blue-500">Appointment</span>
                        </Link>

                        <Link href="/schedule/availability">
                            <span className="block hover:text-blue-500">Availability</span>
                        </Link>

                        <Link href="/schedule/bookings">
                            <span className="block hover:text-blue-500">Bookings</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            Hey, {user.email}!
                            <LogoutButton />
                        </div>
                    </div>
                )}
            </nav>
            <main>
                <AppointmentBoard appointmentData={appointments} />
            </main>
        </div>
    );
};

export default ScheduleApp;