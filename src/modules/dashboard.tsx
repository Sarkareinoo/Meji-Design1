"use client";

import background from "@/assets/background.png";

export default function Dashboard() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${background})` }}
      >

      <div className="ms-75"> 
        <h1 className="text-3xl mb-6 text-gray-900">
          Welcome from dashboard
        </h1>

       
      </div>

    </div>
  );
}
