import {
  Router,
  Network,
  MonitorSmartphone,
  Server,
  Cloud,
  ShieldCheck,
  Wifi,
  Laptop,
  Database,
  Globe,
  Type, // Ikon untuk Text Tool
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import type { DeviceType } from "@shared/canvas";

// --- Data Configuration ---

// Definisi Kategori
type Category = "infrastructure" | "endpoints" | "security" | "cloud" | "tools";

interface DeviceItem {
  type: string; // Menggunakan string untuk fleksibilitas (DeviceType)
  label: string;
  icon: any;
  category: Category;
}

// Daftar Semua Alat / Device
const deviceList: DeviceItem[] = [
  // 1. Infrastructure
  { type: "router", label: "Router", icon: Router, category: "infrastructure" },
  { type: "switch", label: "Switch", icon: Network, category: "infrastructure" },
  { type: "access_point", label: "Access Point", icon: Wifi, category: "infrastructure" },

  // 2. Endpoints
  { type: "pc", label: "PC / Workstation", icon: MonitorSmartphone, category: "endpoints" },
  { type: "laptop", label: "Laptop", icon: Laptop, category: "endpoints" },
  { type: "server", label: "Server", icon: Server, category: "endpoints" },

  // 3. Security
  { type: "firewall", label: "Firewall", icon: ShieldCheck, category: "security" },

  // 4. Cloud & WAN
  { type: "cloud", label: "Cloud", icon: Cloud, category: "cloud" },
  { type: "internet", label: "Internet", icon: Globe, category: "cloud" },
  { type: "database", label: "Database", icon: Database, category: "cloud" },

  // 5. Tools / Misc (BARU: TEXT LABEL)
  { type: "text", label: "Text Label", icon: Type, category: "tools" },
];

// Konfigurasi Header Kategori
const categories: { id: Category; label: string }[] = [
  { id: "infrastructure", label: "Infrastructure" },
  { id: "endpoints", label: "End Devices" },
  { id: "security", label: "Security" },
  { id: "cloud", label: "Cloud & WAN" },
  { id: "tools", label: "Text Labeling" }, // Kategori baru untuk Text
];

// --- Components ---

interface DeviceCardProps {
  item: DeviceItem;
  onDragStart: (type: string) => void;
  compact?: boolean;
}

function DeviceCard({ item, onDragStart, compact }: DeviceCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        // Set data transfer agar bisa ditangkap oleh Canvas saat drop
        e.dataTransfer.setData("deviceType", item.type);
        onDragStart(item.type);
      }}
      className={`
        flex flex-col items-center justify-center rounded-lg bg-card border border-border
        cursor-grab active:cursor-grabbing hover:border-primary/50 hover:bg-accent/50 transition-all duration-200
        ${compact ? "p-2 min-h-16" : "p-3 min-h-24"}
      `}
      title={item.label}
    >
      <div className={`flex items-center justify-center rounded-md bg-muted ${compact ? "w-8 h-8 mb-1" : "w-10 h-10 mb-2"}`}>
        <item.icon className={`${compact ? "w-4 h-4" : "w-6 h-6"} text-foreground`} />
      </div>
      {!compact && (
        <span className="text-xs font-medium text-center text-muted-foreground leading-tight">
          {item.label}
        </span>
      )}
    </div>
  );
}

interface DeviceSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function DeviceSidebar({ collapsed = false, onCollapse }: DeviceSidebarProps) {
  // State untuk accordion (buka/tutup kategori)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    infrastructure: true,
    endpoints: true,
    security: true,
    cloud: true,
    tools: true
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleDragStart = (type: string) => {
    console.log(`Started dragging: ${type}`);
  };

  return (
    <aside
      className={`hidden md:flex flex-col h-full bg-sidebar border-r border-border transition-all duration-300 relative z-20 ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-border h-14">
        {!collapsed && <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Library</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse?.(!collapsed)}
          className="ml-auto w-8 h-8"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {collapsed ? (
          // --- Tampilan Collapsed (Hanya Icon) ---
          <div className="flex flex-col gap-2 p-2 items-center">
            {deviceList.map((device) => (
              <DeviceCard key={device.type} item={device} onDragStart={handleDragStart} compact />
            ))}
          </div>
        ) : (
          // --- Tampilan Full (Accordion Kategori) ---
          <div className="p-4 space-y-6">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase hover:text-foreground transition-colors group"
                >
                  {cat.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openCategories[cat.id] ? "" : "-rotate-90"}`} />
                </button>

                {/* Grid Item Devices */}
                {openCategories[cat.id] && (
                  <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {deviceList
                      .filter(d => d.category === cat.id)
                      .map((device) => (
                        <DeviceCard key={device.type} item={device} onDragStart={handleDragStart} />
                      ))
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Hint */}
      {!collapsed && (
        <div className="p-3 border-t border-border bg-sidebar/50">
          <p className="text-[10px] text-center text-muted-foreground">
            Drag & Drop items to canvas
          </p>
        </div>
      )}
    </aside>
  );
}

// --- Mobile Version (Drawer/Sheet) ---
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-background flex flex-col">
        <SheetTitle className="p-4 border-b border-border text-lg font-bold">Network Library</SheetTitle>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
           {categories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase">{cat.label}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {deviceList.filter(d => d.category === cat.id).map((device) => (
                    <DeviceCard
                      key={device.type}
                      item={device}
                      onDragStart={(t) => { console.log(t); setOpen(false); }}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DeviceSidebar;
