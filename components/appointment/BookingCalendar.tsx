'use client'

import { useEffect, useState } from "react";
import {
    Calendar,
    dateFnsLocalizer,
    Event,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns"
import "react-big-calendar/lib/css/react-big-calendar.css";
import './calendar.css';
import { enUS } from "date-fns/locale";

import { createClient } from "@/lib/supabase/client";

import AppointmentDialog from "./AppointmentDialog";
import { useParams } from 'next/navigation';

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

type Appointment = Event;

function sortByDate(events: Event[], order: 'asc' | 'desc' = 'asc'): Event[] {
    return events.sort((a, b) => {
        const dateA = new Date(a.start).getTime();
        const dateB = new Date(b.start).getTime();

        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
}


const BookingCalendar = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
    const params = useParams()
    const userId = params.userid;

    const handleSubmitUpdate = async (dataInputs: any) => {
        const supabase = createClient();
        try {
            const { data, error } = await supabase
                .from('appointments')
                .update({
                    fullname: dataInputs.fullname,
                    email: dataInputs.email,
                    title: dataInputs.title,
                    contactno: dataInputs.contact,
                    description: dataInputs.description,
                    is_available: false
                })
                .eq('id', selectedAppointment.id)
                .select(); // Optional: returns the updated record

            if (error) {
                console.error('Update failed:', error.message);
            } else {
                const { data: resData, error: errData } = await supabase.from("appointments").select("*").eq('userId', userId)
                    .eq('is_available', true);
                const appointmentData = resData && resData.map((appointment: any) => {
                    return {
                        ...appointment,
                        start: new Date(appointment.start_date),
                        end: new Date(appointment.end_date)
                    }
                })
                setAppointments(appointmentData as Appointment[])
                setIsDialogOpen(false);
                console.log('Updated record:', data);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            const supabase = createClient();
            const { data: resData, error: errData } = await supabase.from("appointments").select("*").eq('userId', userId)
                .eq('is_available', true);
            const appointmentData = resData && resData.map((appointment: any) => {
                return {
                    ...appointment,
                    start: new Date(appointment.start_date),
                    end: new Date(appointment.end_date)
                }
            })
            setAppointments(appointmentData as Appointment[])
        })()
    }, [])

    const handleSelectEvent = (event: any) => {
        if (event.is_available) {
            // Trigger dialog/modal for booking
            setIsDialogOpen(true)
            setSelectedAppointment(event)
            console.log("Booking slot:", event);
        } else {
            alert("This slot is already booked.");
        }
    };
    // console.log({userId})
    let viewsList: any = ["month", "week", "day", "agenda"];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl md:text-3xl  font-semibold text-gray-800 mb-6 text-center">
                📅 Schedule Appointment
            </h1>
            {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">
                📅 Schedule Appointment
            </h2> */}
            <div className="calendar-container w-full h-[500px] sm:h-[650px] md:h-[600px] lg:h-[650px] xl:h-[650px] overflow-hidden">
                <Calendar
                    localizer={localizer}
                    events={appointments}
                    defaultView="week"
                    views={viewsList}
                    selectable
                    onSelectEvent={handleSelectEvent}
                    startAccessor="start"
                    endAccessor="end"
                    // defaultDate={appointments.length ? appointments[0].start : null}
                    // scrollToTime={appointments.length ? appointments[0].start : null}
                    style={{ height: '100%', width: '100%' }}
                    className="custom-calendar"
                />
            </div>

            <AppointmentDialog
                startDateProp={selectedAppointment ? selectedAppointment.start_date : ''}
                endDateProps={selectedAppointment ? selectedAppointment.end_date : ''}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleSubmitUpdate}
            />
        </div>

    )

};

export default BookingCalendar;
