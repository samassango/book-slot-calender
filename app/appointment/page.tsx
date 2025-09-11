import React from 'react';
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AppointmentViewer from '@/components/appointment/AppointmentViewer';
import ErrorMessage from '@/components/error-mesage/ErrorMessage';

export default async function Appointment() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }
    const { claims: { sub } } = data
    const { data: resData, error: errData } = await supabase.from("appointments").select("*").eq('userId', sub)
        .eq('is_available', false);
    console.log({ resData, errData })
    if (errData) {
        return <ErrorMessage message={'Error occured while fetching data'} />;
    }
    
    return (
        <div>
            <AppointmentViewer appointments={resData} />
        </div>
    );
}
