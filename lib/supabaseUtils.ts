import { createClient } from "@/lib/supabase/client";

export async function updateAppointmentStatus(id: string, status: string) {
    const supabase = createClient()
    const { error, data } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
    if (error) console.error('Supabase update error:', error.message);
}
