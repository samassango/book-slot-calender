import React from 'react';
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AppointmentFormWithSlots from '@/components/availability/AppointmentFormWithSlots';
import ErrorMessage from '@/components/error-mesage/ErrorMessage';

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  const { claims: { sub } } = data
  const { data: resAppointments, error: errorAppointment } = await supabase
        .from('appointments')
        .select('*')
        .eq('userId', sub)
        .eq('is_available', true);
  console.log({ resAppointments, errorAppointment })
  if (errorAppointment) {
    return <ErrorMessage message={'Error occured while fetching data'} />;
  }

  return (
    <>
      <AppointmentFormWithSlots user={data.claims} appointments={resAppointments} />
    </>
  );
}
