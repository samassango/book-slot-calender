
import React from 'react';
import { NavigationHeader } from '../NavigationHeader/NavigationHeader';
import { createClient } from "@/lib/supabase/server";

export default async function AuthLayout({ children }: any) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(/images/background.png)` }}
    >
      <NavigationHeader user={user} />

      <main className="flex-1 w-full flex justify-center px-4 sm:px-6 md:px-10 py-6">
        <div className="w-full h-full text-gray-800">
          {children}
        </div>
      </main>
       <footer className="w-full text-center py-4 text-sm text-white bg-black bg-opacity-60">
       Copyright © 2025. Designed & Developed by <span className="font-semibold">Samassango</span>
      </footer>
    </div>
  );
}