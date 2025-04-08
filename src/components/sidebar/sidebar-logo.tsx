
import { Link } from "react-router-dom";
import { BoxIcon } from "lucide-react";

interface SidebarLogoProps {
  isSidebarOpen: boolean;
}

export function SidebarLogo({ isSidebarOpen }: SidebarLogoProps) {
  return (
    <>
      {isSidebarOpen ? (
        <Link to="/" className="flex items-center">
          <BoxIcon className="h-6 w-6 text-primary mr-2" />
          <span className="text-lg font-semibold">Nita KitchenMart</span>
        </Link>
      ) : (
        <Link to="/" className="flex items-center justify-center w-full">
          <BoxIcon className="h-6 w-6 text-primary" />
        </Link>
      )}
    </>
  );
}
