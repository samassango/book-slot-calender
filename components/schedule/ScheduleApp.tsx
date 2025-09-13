'use client'

import React, { useState } from 'react';
import AppointmentBoard from './AppointmentBoard';
import { NavigationHeader } from '../NavigationHeader/NavigationHeader';


const ScheduleApp: React.FC<any> = ({ user, appointments }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log({ appointments })
    return (
        <div
            className="min-h-screen bg-cover bg-center text-gray-800"
            style={{ backgroundImage: "url('/images/background.png')" }} // Replace with your background image path
        >
            <NavigationHeader user={user} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
            <main>
                <AppointmentBoard appointmentData={appointments} />
            </main>
        </div>
    );


};

export default ScheduleApp;