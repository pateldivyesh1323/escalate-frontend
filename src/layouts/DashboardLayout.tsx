import type { ReactNode } from "react";
import Sidebar from "@/components/navigation/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50/50">
      <Sidebar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
