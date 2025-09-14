'use client'

import Link from 'next/link';
import Image from 'next/image';
import { LogoutButton } from '../logout-button';
import { useState } from 'react';

export const NavigationHeader = ({ user }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (<nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <Image src='/images/AppointmentPro.png' width={50} height={30} alt="Logo" />
                <span className="text-xl font-bold text-blue-600">SchedulerPro</span>
            </div>
            <div className="hidden md:flex space-x-6 text-gray-800 font-bold">
                <Link className='p-1' href="/schedule">
                    <span className="font-bold hover:text-blue-500 mt-2">Home</span>
                </Link>
                <Link className='p-1' href="/schedule/appointment">
                    <span className="font-bold hover:text-blue-500 mt-2">Appointment</span>
                </Link>
                <Link className='p-1' href="/schedule/availability">
                    <span className="font-bold hover:text-blue-500 mt-2">Availability</span>
                </Link>

                <Link className='p-1' href="/schedule/bookings">
                    <span className="font-bold hover:text-blue-500 mt-2">Bookings</span>
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
            <div className="md:hidden px-4 pb-4 space-y-2 text-gray-800 font-bold">
                <Link className='p-1' href="/schedule">
                    <span className="font-bold hover:text-blue-500">Home</span>
                </Link>
                <Link className='p-1' href="/schedule/appointment">
                    <span className="block font-bold hover:text-blue-500">Appointment</span>
                </Link>

                <Link className='p-1' href="/schedule/availability">
                    <span className="block font-bold hover:text-blue-500">Availability</span>
                </Link>

                <Link className='p-1' href="/schedule/bookings">
                    <span className="block font-bold hover:text-blue-500">Bookings</span>
                </Link>

                <div className="flex items-center gap-4">
                    Hey, {user.email}!
                    <LogoutButton />
                </div>
            </div>
        )}
    </nav>);
}