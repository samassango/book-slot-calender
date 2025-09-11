'use client'
import React from 'react';
import Image from 'next/image';

const LandingPage: React.FC = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center w-full"
            style={{ backgroundImage: `url(/images/background.png)` }}
        >
            {/* Overlay for readability */}
            <div className="bg-white bg-opacity-80 min-h-screen">
                {/* Header with Logo */}
                <header className="px-6 py-4 flex items-center">
                    <Image src='/images/AppointmentPro.png' alt="Logo" width={50} height={50} className="h-10 w-10 mr-2" />
                    <h1 className="text-xl font-bold text-blue-600">SchedulerPro</h1>
                </header>

                {/* Main Content */}
                <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-20">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl py-16">
                        {/* Left: Description + Buttons */}
                        <div className="md:w-1/2 text-center md:text-left">
                            <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
                                Appointment Scheduler Platform
                            </h2>
                            <p className="text-lg text-gray-700 mb-6">
                                Let's help you manage all your appointments at an affordable cost.
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <a href='/auth/login' className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                    Login
                                </a>
                                <a href='auth/sign-up' className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">
                                    Sign Up
                                </a>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                            <Image
                                src='/images/web-image.png'
                                width={80}
                                height={80}
                                alt="Appointment Illustration"
                                className="w-full max-w-md rounded-lg"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;
