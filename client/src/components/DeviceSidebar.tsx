import { Router, MonitorSmartphone, Network, ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import type { DeviceType } from "@shared/canvas";

interface DeviceCardProps {
  type: DeviceType;
  label: string;
  icon: typeof Router;
  onDragStart: (type: DeviceType) => void;
}

function DeviceCard({ type, label, icon: Icon, onDragStart }: DeviceCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("deviceType", type);
        onDragStart(type);
      }}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-card border border-card-border cursor-grab hover-elevate active-elevate-2 transition-transform duration-200 min-h-24"
      data-testid={`device-card-${type}`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-muted mb-2">
        <Icon className="w-6 h-6 text-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}

interface DeviceSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const devices: Array<{ type: DeviceType; label: string; icon: typeof Router }> = [
  { type: "router", label: "Router", icon: Router },
  { type: "switch", label: "Switch", icon: Network },
  { type: "pc", label: "PC", icon: MonitorSmartphone },
];

export function DeviceSidebar({ collapsed = false, onCollapse }: DeviceSidebarProps) {
  const handleDragStart = (type: DeviceType) => {
    console.log(`Started dragging: ${type}`);
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64 lg:w-72"
      }`}
      data-testid="sidebar-desktop"
    >
      <div className="flex items-center justify-between gap-2 p-4 border-b border-sidebar-border h-14">
        {!collapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">Devices</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse?.(!collapsed)}
          className="ml-auto"
          data-testid="button-collapse-sidebar"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {collapsed ? (
          <div className="flex flex-col gap-3">
            {devices.map((device) => (
              <div
                key={device.type}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("deviceType", device.type);
                  handleDragStart(device.type);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-card border border-card-border cursor-grab hover-elevate active-elevate-2"
                title={device.label}
                data-testid={`device-icon-${device.type}`}
              >
                <device.icon className="w-5 h-5 text-foreground" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.type}
                type={device.type}
                label={device.label}
                icon={device.icon}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            Drag devices to the canvas
          </p>
        </div>
      )}
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  const handleDragStart = (type: DeviceType) => {
    console.log(`Started dragging: ${type}`);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          data-testid="button-mobile-menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar">
        <SheetTitle className="sr-only">Device Library</SheetTitle>
        <div className="flex items-center justify-between gap-2 p-4 border-b border-sidebar-border h-14">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Devices</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            data-testid="button-close-mobile-menu"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {devices.map((device) => (
              <DeviceCard
                key={device.type}
                type={device.type}
                label={device.label}
                icon={device.icon}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <p className="text-xs text-muted-foreground text-center">
            Drag devices to the canvas
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DeviceSidebar;
