import { createContext } from "react";
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}



export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
