import { ReactNode } from "react";
import Breadcrumb from "../components/BreadCrumb";
import NavbarLayout from "./Navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <NavbarLayout />
      <main>{children}</main>
    </div>
  );
}
