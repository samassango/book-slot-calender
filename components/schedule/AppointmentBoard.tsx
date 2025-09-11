// AppointmentBoard.tsx
import React, { useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    {
        id: 'dddddd-werrerr-ooooo-3456t5',
        fullname: 'John Doe',
        description: 'Dental Checkup',
        start_date: '10:00',
        end_date: '11:00',
        status: 'todo',
    },
    {
        id: 'rrrrr-oooooo-pppppp-231234',
        fullname: 'Jane Smith',
        description: 'Consultation',
        start_date: '14:00',
        end_date: '15:00',
        status: 'progress',
    },
    {
        id: 'ggggg-oooooo-pppppp-231234',
        fullname: 'Sizwe Zondo',
        description: 'Consultation',
        start_date: '14:00',
        end_date: '15:00',
        status: 'done',
    },
];

const statusStyles: Record<Status, string> = {
    todo: 'bg-gray-500',
    progress: 'bg-blue-600',
    done: 'bg-green-500',
};

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: appointment.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`text-white p-4 rounded shadow-md mb-4 ${statusStyles[appointment.status]}`}
        >
            <div className="flex justify-between items-start">
                {/* Left: Description and Name */}
                <div>
                    <h3 className="font-bold text-sm">{appointment.description}</h3>
                    <p>{appointment.fullname}</p>
                </div>

                {/* Right: Start/End Time on Desktop */}
                <div className="hidden md:flex flex-col text-sm text-right">
                    <span>{new Date(appointment.start_date).toLocaleTimeString()} - {new Date(appointment.end_date).toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Bottom: Date + Time on Mobile/Tablet */}
            <div className="flex flex-col md:hidden mt-2 text-sm space-y-1">
                <div className="flex justify-between">
                    <span>{new Date(appointment.start_date).toDateString()}</span>
                    <span>{new Date(appointment.start_date).toLocaleTimeString()} - {new Date(appointment.end_date).toLocaleTimeString()}</span>
                </div>
            </div>

        </div>
    );
};

const AppointmentBoard: React.FC<{ appointmentData: any[] | undefined }> = ({ appointmentData }: { appointmentData: any[] | undefined }) => {
    const [appointments, setAppointments] = useState<Appointment[]|undefined>(initialAppointments);
    useEffect(() => {
setAppointments(appointmentData)
    }, [appointmentData])
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const dragged =appointments && appointments.find(a => a.id === active.id);
        if (!dragged) return;

        const newStatus = over.id as Status;
        setAppointments(prev =>
           prev && prev.map(a => (a.id === active.id ? { ...a, status: newStatus } : a))
        );
    };

    const getAppointmentsByStatus = (status: Status) =>
        appointments ? appointments.filter(a => a.status === status).length : 0;
     const getAppointmentsAllByStatus = (status: Status) =>
        appointments ? appointments.filter(a => a.status === status): []
    console.log({ appointmentData })
    return (
        <div className="p-6 bg-white bg-opacity-50 min-h-screen">
            {/* Summary Cards */}
            <div className="grid text-white grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">To Do</h4>
                    <p>{getAppointmentsByStatus('todo')}</p>
                </div>
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">Done</h4>
                    <p>{getAppointmentsByStatus('done')}</p>
                </div>
                <div className="bg-blue-600 p-4 rounded shadow text-center">
                    <h4 className="text-lg font-semibold">Total</h4>
                    <p>{appointments ?appointments.length :0}</p>
                </div>
            </div>

            {/* Drag and Drop Columns */}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(['todo', 'progress', 'done'] as Status[]).map(status => (
                        <div key={status} className="bg-gray-100 p-4 rounded shadow">
                            <h2 className="text-xl font-bold mb-4 capitalize">{status}</h2>
                            <SortableContext
                                items={getAppointmentsAllByStatus(status).map(a => a.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {getAppointmentsAllByStatus(status).map(appointment => (
                                    <AppointmentCard key={appointment.id} appointment={appointment} />
                                ))}
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
};

export default AppointmentBoard;
