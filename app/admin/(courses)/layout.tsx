import { ReactNode } from "react";
import NavbarLayout from "./Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <NavbarLayout />
      {children}
    </div>
  );
}
