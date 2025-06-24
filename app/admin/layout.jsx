import Sidebar from "@/Components/AdminComponent/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function adminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <ToastContainer theme="dark" />
      <Sidebar />
      <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
