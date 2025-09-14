'use client'

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AppointmentDialog from "./AvailabilityDialog";
import AvailableSlotsTable, { IAppointment } from "./AvailableSlotsTable";

export default function AppointmentFormWithSlots({ user, appointments }: any) {
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointmentData, setAppointmentData] = useState<any[] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setSubmittedData(values);
    },
  });

  useEffect(() => {
    createAppointment(submittedData).then(_ => {
      getAppointments().then(_ => _)
    })
  }, [submittedData])

  useEffect(() => {
    getAppointments().then(_ => { })
  }, [])

  const getAppointments = async () => {
    const supabase = createClient();
    const { data: resAppointments, error: errorAppointment } = await supabase
      .from('appointments')
      .select('*')
      .eq('userId', user.sub)
      .eq('is_available', true);
    setAppointmentData(resAppointments)
  }

  const deleteAppointmentsById = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('appointments') // Replace with your actual table name
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting slot:', error.message);
    } else {
      await getAppointments()
      console.log(`Slot with ID ${id} deleted successfully.`);
    }
  }

  const createAppointment = async (inputData: any,) => {
    const supabase = createClient();
    try {
      const start_date = new Date(inputData.startDate), end_date = new Date(inputData.endDate)
      console.log({ start_date, end_date })
      const { data, error: dataError } = await supabase
        .from('appointments')
        .insert([{
          title: inputData.title,
          start_date,
          end_date,
          is_available: true,
          userId: user.sub
        }]);
      console.log({ data })
      await getAppointments()
      if (dataError) throw dataError;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDialogSubmit = async (data: any) => {
    console.log({ submittedData:data })
    await createAppointment(data)
    setIsDialogOpen(false)
  }
  const onCreateDialog = () => {
    setIsDialogOpen(true)
  }
  const onSelectedAppointment = (appointment: IAppointment) => {
    console.log({ appointment });
    deleteAppointmentsById(appointment.id).then(_=>_);
  }

  const onEditAppointment = (appointment: IAppointment) => {
    console.log({ appointment });
  }

  console.log({ user, appointments, appointmentData })
  return (
    <div className="p-2 max-w-5xl mx-auto pt-16">
      <h2 className="text-base font-bold mb-4 text-center">Create Time slot for Appointment Availability </h2>
      <AvailableSlotsTable 
      onCreateDialog={onCreateDialog} 
      onSelectedAppointment={onSelectedAppointment} 
      onEditAppointment={onEditAppointment}
      availableAppointment={appointmentData}
      userId={user.sub} />
      <AppointmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />

    </div>
  );
}
