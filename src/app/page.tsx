"use client"
import { useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

export default function Home() {
 // Assuming you get the code from the URL


  const clickHandler =async () => {
    await signIn("patreon");
  };

  return (
    <h1>
      <button onClick={clickHandler} className="bg-red-400 p-4 rounded-md text-white">
        Join at Patreon
      </button>
      <div>
        
      </div>
    </h1>
  );
}
