// 'use client'
import React from 'react';

export default function AuthLayout({children}:any) {
  return (
   <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{ backgroundImage: `url(/images/background.png)` }}>
      <div className="w-full max-w-sm">
        {children}
    </div>
    </div>
  );
}
