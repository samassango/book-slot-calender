// AppointmentBoard.tsx
import React, { useEffect, useRef, useState } from 'react';
import TaskBoard from './Taskboard';
import { QRCodeSVG } from 'qrcode.react';
import CountUp from 'react-countup';
import html2canvas from 'html2canvas';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';
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

const AppointmentBoard: React.FC<{ appointmentData: any[] | undefined, user: any }> = ({ appointmentData, user }: { appointmentData: any[] | undefined, user: any }) => {
    const [appointments, setAppointments] = useState<Appointment[] | undefined>(initialAppointments);
    const [bookingUrl, setBookingUrl] = useState<string>("");
    const qrRef = useRef<HTMLDivElement>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setAppointments(appointmentData)
    }, [appointmentData])

    useEffect(() => {
        if (window)
            setBookingUrl(`${window.location.host}/appointment/${user.sub}`)
    }, [])

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

    const generateImage = async () => {
        if (qrRef.current) {
            const canvas = await html2canvas(qrRef.current);
            const dataUrl = canvas.toDataURL('image/png');
            
            setImageUrl(dataUrl);
            setShowPopup(true); // Show popup after image is ready
        }
    };
    console.log({ appointmentData, user })
    return (
        <div className="p-6 bg-white bg-opacity-50 min-h-screen">
            {/* Summary Cards */}
            <div className="grid text-white grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="border-4 border-solid bg-blue-600 p-4 rounded-lg shadow-lg text-center">
                    <h4 className="text-lg font-semibold">To Do</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={getAppointmentsByStatus('todo')} duration={2} separator="," />
                    </p>
                </div>
                <div className="border-4 border-solid bg-blue-600 p-4 rounded-lg shadow-lg text-center">
                    <h4 className="text-lg font-semibold">Done</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={getAppointmentsByStatus('done')} duration={2} separator="," />
                    </p>
                </div>
                <div className="border-4 border-solid bg-blue-600 p-4 rounded-lg shadow-lg text-center">
                    <h4 className="text-lg font-semibold">Total</h4>
                    <p className='text-6xl font-bold'>
                        <CountUp end={appointments ? appointments.length : 0} duration={2} separator="," />
                    </p>
                </div>
                <div className="border-4 border-solid bg-blue-600 p-4 rounded-lg shadow-lg text-center">
                    <div ref={qrRef} className="flex items-center flex-col relative mb-4">
                        <QRCodeSVG value={bookingUrl} size={100} className='border-4 border-white' />
                        <div className=" bottom-0 bg-black bg-opacity-20 text-white w-full text-center py-2 text-sm">
                            Scan to make an appointment
                        </div>
                    </div>
                    <div className='flex justify-between gap-1'>
                        <button
                            onClick={handleDownload}
                            className="border-2 border-solid py-2 p-5 w-32 grow bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition duration-300"
                        >
                            Download
                        </button>

                        <button
                            onClick={generateImage}
                            className="border-2 border-solid py-2 p-5 w-32 grow bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition duration-300"
                        >
                            Share
                        </button>
                    </div>
                </div>

            </div>

            <TaskBoard appointmentData={appointmentData} />

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-lg font-semibold mb-4">Share this image</h2>
                        <div className="flex justify-center gap-4 mb-4">
                            <FacebookShareButton url={imageUrl}>
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={imageUrl}>
                                <TwitterIcon size={40} round />
                            </TwitterShareButton>
                            <WhatsappShareButton url={imageUrl}>
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AppointmentBoard;


