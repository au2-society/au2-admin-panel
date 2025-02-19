import { useDispatch } from "react-redux";
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logoutAdmin } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";

export function SidebarBottomAdminBar({
  admin,
}: {
  admin?: { fullName?: string; email?: string; avatar?: string } | null;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { isMobile } = useSidebar();

  const handleLogout = () => {
    dispatch(logoutAdmin());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={admin?.avatar || ""}
                  alt={admin?.fullName || "Admin"}
                />
                <AvatarFallback className="rounded-lg">
                  {admin?.fullName
                    ? admin.fullName.charAt(0).toUpperCase()
                    : "A"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {admin?.fullName || "Admin"}
                </span>
                <span className="truncate text-xs">
                  {admin?.email || "admin@example.com"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={admin?.avatar || ""}
                    alt={admin?.fullName || "Admin"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {admin?.fullName
                      ? admin.fullName.charAt(0).toUpperCase()
                      : "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {admin?.fullName || "Admin"}
                  </span>
                  <span className="truncate text-xs">
                    {admin?.email || "admin@example.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
