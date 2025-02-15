import Breadcrumb from "../components/BreadCrumb";
import NavbarLayout from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <NavbarLayout /> 
      {children}
    </div>
  );
}
