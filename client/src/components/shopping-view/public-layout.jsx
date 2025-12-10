import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HousePlug } from "lucide-react";

const PublicLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
           <HousePlug className="h-6 w-6" />
            <span className="font-bold">Speed-Box Store</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
