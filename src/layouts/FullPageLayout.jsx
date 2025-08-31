import React from 'react';
import { Outlet } from 'react-router-dom';

const FullPageLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex items-center justify-center">
        <Outlet /> 
      </main>
    </div>
  );
};

export default FullPageLayout;