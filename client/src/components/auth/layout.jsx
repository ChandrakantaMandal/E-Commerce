import React from "react";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex justify-center items-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to Speed-Box Store</h1>
          <p className="text-lg">
            Discover a world of products and services at your fingertips.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default layout;
