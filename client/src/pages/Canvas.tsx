import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { CanvasHeader } from "@/components/CanvasHeader";
import { DeviceSidebar } from "@/components/DeviceSidebar";
import { NetworkCanvas } from "@/components/NetworkCanvas";

export default function CanvasPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col bg-background" data-testid="canvas-page">
        <CanvasHeader />
        
        <div className="flex-1 flex overflow-hidden">
          <DeviceSidebar
            collapsed={sidebarCollapsed}
            onCollapse={setSidebarCollapsed}
          />
          
          <main className="flex-1 relative overflow-hidden">
            <NetworkCanvas className="absolute inset-0" />
            
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 pointer-events-none">
              <div className="bg-card/80 backdrop-blur-sm border border-card-border rounded-lg px-4 py-2 pointer-events-auto inline-block">
                <p className="text-xs text-muted-foreground">
                  Drag devices from the sidebar to add them to the canvas
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
