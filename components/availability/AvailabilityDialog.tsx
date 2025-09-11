import { useFormik } from "formik";
import * as Yup from "yup";
import AppointmentSlotForm, { IAppointmentForm } from "./AppointmentSlotForm";

interface Props {
    isOpen: boolean;
    onClose: () => void,
    onSubmit: (data: {
        title: string,
        startDate: string,
        endDate: string,
    }) => void;
}

export default function AppointmentDialog({ isOpen, onClose, onSubmit }: Props) {
    const formik = useFormik({
        initialValues: {
            title: "",
            startDate: "",
            endDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            startDate: Yup.string().required("Start date is required"),
            endDate: Yup.string().required("End date is required"),
        }),
        onSubmit: (values: any) => {
            values.startDate = new Date(values.startDate)
            values.endDate = new Date(values.endDate)
            onSubmit(values);
        },
    });

    const onSubmitHandler =(form: IAppointmentForm)=>{
        onSubmit(form as any)
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-500 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create Available Slot</h2>
                <AppointmentSlotForm onSubmit={onSubmitHandler} onClose={onClose}/>
            </div>
        </div>
    )
}