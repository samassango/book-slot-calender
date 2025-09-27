// TaskBoard.tsx
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './Column'; // custom component for each column
import { updateAppointmentStatus } from '@/lib/supabaseUtils';

const initialTasks = {
    todo: [],
    progress: [],
    done: [],
};

export default function TaskBoard({ appointmentData }: { appointmentData: any[] | undefined }) {
    const [tasks, setTasks] = useState(initialTasks);

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        setTasks({
            todo: appointmentData.filter(appointment=> appointment.status==='todo'),
            progress: appointmentData.filter(appointment=> appointment.status==='progress'),
            done: appointmentData.filter(appointment=> appointment.status==='done'),
        })
    }, [])

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const sourceColumn = Object.keys(tasks).find((key) =>
            tasks[key].some((task) => task.id === active.id)
        );
        const destinationColumn = over.id;

        if (!sourceColumn || sourceColumn === destinationColumn) return;

        const task = tasks[sourceColumn].find((t) => t.id === active.id);
        const newSource = tasks[sourceColumn].filter((t) => t.id !== active.id);
        const newDestination = [...tasks[destinationColumn], task!];

        const updated = {
            ...tasks,
            [sourceColumn]: newSource,
            [destinationColumn]: newDestination,
        };

        setTasks(updated);
        await updateAppointmentStatus(active.id.toString(), destinationColumn.toString()); // Supabase update
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {Object.keys(tasks).map((columnId) => (
                    <SortableContext
                        key={columnId}
                        items={tasks[columnId].map((task) => task.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Column id={columnId} tasks={tasks[columnId]} />
                    </SortableContext>
                ))}
            </div>
        </DndContext>
    );
}
