// AppointmentBoard.tsx
import React, { useEffect, useRef, useState } from 'react';
import TaskBoard from './Taskboard';
import { QRCodeSVG } from 'qrcode.react';
import CountUp from 'react-countup';
type Status = 'todo' | 'progress' | 'done';

interface Appointment {
    id: string;
    fullname: string;
    description: string;
    start_date: string;
    end_date: string;
    status: Status;
}

const initialAppointments: Appointment[] = [

];

// const getUrl = (userId)=>`${window.location.host}/appointment/${userId}`
const AppointmentBoard: React.FC<{ appointmentData: any[] | undefined, user: any }> = ({ appointmentData, user }: { appointmentData: any[] | undefined, user: any }) => {
    const [appointments, setAppointments] = useState<Appointment[] | undefined>(initialAppointments);
    const [bookingUrl, setBookingUrl] = useState<string>("");
    const qrRef = useRef<HTMLDivElement>(null);
    // const bookingUrl = getUrl(user.sub);
    useEffect(() => {
        setAppointments(appointmentData)
    }, [appointmentData])

    useEffect(() => {
        setBookingUrl(`${window.location.host}/appointment/${user.sub}`)
    }, [window])

    const getAppointmentsByStatus = (status: Status) =>
        appointments ? appointments.filter(a => a.status === status).length : 0;

    const handleDownload = () => {
    const svg = document.querySelector('svg');;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'appointment-qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  };
    console.log({ appointmentData, user })
    return (
        <div className="p-6 bg-white bg-opacity-50 min-h-screen">
            {/* Summary Cards */}
            <div className="grid text-white grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">To Do</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={getAppointmentsByStatus('todo')} duration={2} separator="," />
                    </p>
                </div>
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">Done</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={getAppointmentsByStatus('done')} duration={2} separator="," />
                    </p>
                </div>
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">Total</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={appointments ? appointments.length : 0} duration={2} separator="," />
                    </p>
                </div>
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <div ref={qrRef} className="flex justify-center mb-4">
                        <QRCodeSVG value={bookingUrl} size={100} className='border-4 border-white' />
                    </div>
                    <button
                        onClick={handleDownload}
                        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition duration-300"
                    >
                        Download QR Code
                    </button>
                </div>

            </div>

            <TaskBoard appointmentData={appointmentData} />

        </div>
    );
};

export default AppointmentBoard;


