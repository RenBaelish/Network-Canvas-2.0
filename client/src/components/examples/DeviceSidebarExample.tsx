import { useState } from "react";
import { DeviceSidebar } from "../DeviceSidebar";

export default function DeviceSidebarExample() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="h-[500px] flex bg-background">
      <DeviceSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Canvas Area
      </div>
    </div>
  );
}
