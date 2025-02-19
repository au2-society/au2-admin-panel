import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarNavHeader } from "./sidebar-header";
import { SidebarBottomAdminBar } from "./sidebar-bottom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { admin, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading Sidebar...</div>;
  }

  const adminData = {
    fullName: admin?.fullName || "Admin",
    email: admin?.email || "admin@example.com",
    avatar: admin?.avatar || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarNavHeader />
      </SidebarHeader>
      <SidebarContent>{/* Sidebar Content */}</SidebarContent>
      <SidebarFooter>
        <SidebarBottomAdminBar admin={adminData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
