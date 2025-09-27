// Column.tsx
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';

export default function Column({ id, tasks }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="flex-1 bg-white rounded-lg shadow-md p-4 min-h-[300px]"
        >
            <h3 className="text-xl font-semibold mb-4 capitalize">{id}</h3>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}


function TaskCard({ task }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        padding: '0.75rem',
        marginBottom: '0.5rem',
        background: 'rgba(37, 99, 235, var(--tw-bg-opacity, 1))',
        color: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
         className="bg-blue-50 p-3 rounded-md shadow hover:bg-blue-100 transition-colors mb-2">
             <div className="flex justify-between items-start">
                {/* Left: Description and Name */}
                <div>
                    <h3 className="font-bold text-sm">{task.description}</h3>
                    <p>{task.fullname}</p>
                </div>

                {/* Right: Start/End Time on Desktop */}
                <div className="hidden md:flex flex-col text-sm text-right">
                    <span>{new Date(task.start_date).toLocaleTimeString()} - {new Date(task.end_date).toLocaleTimeString()}</span>
                </div>
            </div>

            {/* Bottom: Date + Time on Mobile/Tablet */}
            <div className="flex flex-col md:hidden mt-2 text-sm space-y-1">
                <div className="flex justify-between">
                    <span>{new Date(task.start_date).toDateString()}</span>
                    <span>{new Date(task.start_date).toLocaleTimeString()} - {new Date(task.end_date).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
}
