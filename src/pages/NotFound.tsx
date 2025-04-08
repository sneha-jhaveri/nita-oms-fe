
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
        Page not found
      </p>
      <p className="text-gray-500 dark:text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
