'use client'

import { useEffect, useState } from "react";
import {
    Calendar,
    dateFnsLocalizer,
    Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";


const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface IAppointment extends Event {
    contact: string;
    email: string;
    fullname: string;
    start_date: string;
    end_date: string;
}

export default function AppointmentViewer(props: { appointments: IAppointment[] }) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [appointments, setAppointments] = useState<IAppointment[]>()

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
    };

    const closeDialog = () => setSelectedEvent(null);

    useEffect(() => {
        if (props.appointments.length) {
            setAppointments(props.appointments.map((appointment: IAppointment) => {
                return {
                    ...appointment,
                    start: new Date(appointment.start_date),
                    end: new Date(appointment.end_date)
                }
            }))
        }
    }, [props.appointments])

    return (
        <div className="w-full p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Appointments</h1>
            <Calendar
                localizer={localizer}
                events={appointments}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                onSelectEvent={handleSelectEvent}
            />

            {/* Popup Dialog */}
            {selectedEvent && (
                renderPopUp(selectedEvent, closeDialog)
            )}
        </div>
    );
}

function renderPopUp(selectedEvent: Event, closeDialog: () => void) {
    return <div className="fixed inset-0 bg-gray-200/50 flex items-center justify-center z-50">
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Appointment Details</h2>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start:</strong> {selectedEvent.start && format(selectedEvent.start, "PPpp")}</p>
            <p><strong>End:</strong> {selectedEvent.end && format(selectedEvent.end, "PPpp")}</p>
            <p><strong>All Day:</strong> {selectedEvent.allDay ? "Yes" : "No"}</p>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={closeDialog}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    </div>;
}

