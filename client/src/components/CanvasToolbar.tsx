import { MousePointer2, Hand, Cable, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/useCanvasStore";

type Tool = "select" | "pan" | "connect";

interface ToolButtonProps {
  tool: Tool;
  icon: typeof MousePointer2;
  label: string;
  shortcut?: string;
  isActive: boolean;
  onClick: () => void;
}

function ToolButton({ tool, icon: Icon, label, shortcut, isActive, onClick }: ToolButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "default" : "ghost"}
          size="icon"
          onClick={onClick}
          className={`toggle-elevate ${isActive ? "toggle-elevated" : ""}`}
          data-testid={`tool-${tool}`}
        >
          <Icon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}{shortcut && <span className="ml-2 text-muted-foreground">({shortcut})</span>}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface CanvasToolbarProps {
  className?: string;
}

export function CanvasToolbar({ className }: CanvasToolbarProps) {
  const { activeTool, setActiveTool, clearCanvas, nodes } = useCanvasStore();

  const tools: Array<{ tool: Tool; icon: typeof MousePointer2; label: string; shortcut: string }> = [
    { tool: "select", icon: MousePointer2, label: "Select", shortcut: "V" },
    { tool: "pan", icon: Hand, label: "Pan", shortcut: "H" },
    { tool: "connect", icon: Cable, label: "Connect", shortcut: "C" },
  ];

  return (
    <div className={`flex items-center gap-1 ${className}`} data-testid="canvas-toolbar">
      {tools.map((t) => (
        <ToolButton
          key={t.tool}
          tool={t.tool}
          icon={t.icon}
          label={t.label}
          shortcut={t.shortcut}
          isActive={activeTool === t.tool}
          onClick={() => setActiveTool(t.tool)}
        />
      ))}

      <Separator orientation="vertical" className="h-6 mx-2" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearCanvas}
            disabled={nodes.length === 0}
            data-testid="button-clear-canvas"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear Canvas</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default CanvasToolbar;
