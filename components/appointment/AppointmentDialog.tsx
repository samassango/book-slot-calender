import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    startDateProp: string;
    endDateProps: string;
    onSubmit: (data: {
        title: string,
        description: string,
        contact: string,
        email: string,
        fullname: string
    }) => void;
}

export default function AppointmentDialog({ isOpen, startDateProp, endDateProps, onClose, onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fullname, setFullname] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-500 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Fullname</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Enter Fullname"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact</label>
                        <input
                            type="tel"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="e.g. +27 72 123 4567"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>


                    {/* Start Date & Time */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                        <input
                            type="text"
                            disabled
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDateProp}
                        />
                    </div>

                    {/* End Date & Time */}
                    <div>
                        <label className="block text-sm font-medium mb-1">End Date & Time</label>
                        <input
                            type="text"
                            disabled
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDateProps}
                        />
                    </div>
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSubmit({ title, description, contact, email, fullname })
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
