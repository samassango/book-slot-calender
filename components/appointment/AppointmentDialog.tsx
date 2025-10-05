import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

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



const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    fullname: Yup.string().required("Full name is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    description: Yup.string(),
});

export default function AppointmentDialog({ isOpen, startDateProp, endDateProps, onClose, onSubmit }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-500 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mx-4">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Book Appointment</h2>

                <Formik
                    initialValues={{
                        title: "",
                        fullname: "",
                        contact: "",
                        email: "",
                        description: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
                    }}
                >
                    <Form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Appointment Reason</label>
                            <Field
                                name="title"
                                type="text"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter reason"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Fullname</label>
                            <Field
                                name="fullname"
                                type="text"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Fullname"
                            />
                            <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                            {/* Contact */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact:</label>
                                <Field
                                    name="contact"
                                    type="tel"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. +27 72 123 4567"
                                />
                                <ErrorMessage name="contact" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Email:</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date & Time:</label>
                                <input
                                    type="text"
                                    disabled
                                    className="w-full border rounded px-3 py-2 bg-gray-300"
                                    value={startDateProp}
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date & Time:</label>
                                <input
                                    type="text"
                                    disabled
                                    className="w-full border rounded px-3 py-2 bg-gray-300"
                                    value={endDateProps}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description (optional):</label>
                            <Field
                                as="textarea"
                                name="description"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter description"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
