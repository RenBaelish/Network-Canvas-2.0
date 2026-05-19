import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { CanvasHeader } from "@/components/CanvasHeader";
import { DeviceSidebar } from "@/components/DeviceSidebar";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { CanvasToolbar } from "@/components/CanvasToolbar";

export default function CanvasPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {}
        <CanvasHeader />

        <div className="flex-1 flex overflow-hidden relative">

          {}
          <DeviceSidebar
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
          />

          {}
          <main className="flex-1 relative flex flex-col">

            {}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-auto">
               <CanvasToolbar />
            </div>

            <NetworkCanvas className="flex-1" />

            {}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-40">
              <div className="bg-background/60 backdrop-blur-sm border border-border rounded-full px-4 py-1.5 shadow-sm">
                <p className="text-[10px] text-muted-foreground font-medium">
                  {sidebarCollapsed ? "Press 'L' to open Library" : "Drag devices to start designing"}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
