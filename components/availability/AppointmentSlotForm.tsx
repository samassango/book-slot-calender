import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

interface AppointmentSlot {
    startDateTime: string;
    additionalHours: number;
    description: string;
}

export interface IAppointmentForm {
    title: string;
    startDate: Date;
    endDate: Date;
}

interface IAppointmentSlotForm {
    onSubmit: (form: IAppointmentForm) => void;
    onClose: () => void;
}

const validationSchema = Yup.object({
    startDateTime: Yup.string().required('Start date and time is required'),
    additionalHours: Yup.number()
        .min(1, 'Must be at least 1 hour')
        .max(24, 'Cannot exceed 24 hours')
        .required('Additional hours required'),
    description: Yup.string().required('Description is required'),
});

const AppointmentSlotForm: React.FC<IAppointmentSlotForm> = ({ onSubmit, onClose }: IAppointmentSlotForm) => {
    const [endTime, setEndTime] = useState<string | null>(null);

    return (
        <div>
            <Formik
                initialValues={{
                    startDateTime: '',
                    additionalHours: 1,
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values: AppointmentSlot, {resetForm}) => {
                    const start = dayjs(values.startDateTime);
                    const end = start.add(values.additionalHours, 'hour');
                    setEndTime(end.format('YYYY-MM-DD HH:mm'));

                    onSubmit({
                        title: values.description,
                        startDate: new Date(values.startDateTime),
                        endDate: new Date(end.format('YYYY-MM-DD HH:mm'))
                    })
                    resetForm()
                }}
            >
                {({ values }) => (
                    <Form className="space-y-4">
                         <div>
                            <label className="block font-medium">Slot Description</label>
                            <Field
                                type="text"
                                name="description"
                                placeholder="e.g. Team meeting, client call..."
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block font-medium">Start Date & Time</label>
                            <Field
                                type="datetime-local"
                                name="startDateTime"
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="startDateTime" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label className="block font-medium">Number of Hours per slot</label>
                            <Field
                                type="number"
                                name="additionalHours"
                                min={1}
                                max={24}
                                className="mt-1 block w-full border rounded px-3 py-2"
                            />
                            <ErrorMessage name="additionalHours" component="div" className="text-red-500 text-sm" />
                        </div>

                       {endTime && (
                            <div className="mt-4 text-green-600">
                                <strong>End Time:</strong> {endTime}
                            </div>
                        )}

                        {/* <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create Slot
                        </button> */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Create Slot
                            </button>
                        </div>

                        
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AppointmentSlotForm;
