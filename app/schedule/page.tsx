
import SchedulerApp from '@/components/schedule/ScheduleApp';
import { createClient } from "@/lib/supabase/server";
import React from 'react';

export default async function Schedule() {
const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  let appointment;
  if(user){
    appointment= await supabase.from("appointments").select("*").eq('userId', user.sub)
        .eq('is_available', false);
  }
  // console.log({appointment, user})
  return (
    <SchedulerApp user={user} appointments={appointment?.data}/>
  );
}
