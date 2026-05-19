import {
  MousePointer2, Hand, Cable, Trash2, Undo2, Redo2,
  ZoomIn, ZoomOut, Maximize, Download, FileImage, FileText, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useCanvasStore } from "@/store/useCanvasStore";
import { useReactFlow, getRectOfNodes, getTransformForBounds } from "reactflow";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useCallback, useEffect, useState } from "react";

function ToolBtn({ icon: Icon, label, isActive, onClick, shortcut, disabled, variant = "ghost", isLoading }: any) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "secondary" : variant}
          size="icon"
          onClick={onClick}
          disabled={disabled || isLoading}
          className={`h-8 w-8 rounded-md ${isActive ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}`}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>{label} {shortcut && <span className="opacity-50 ml-1">({shortcut})</span>}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function CanvasToolbar({ className }: { className?: string }) {
  const { activeTool, setActiveTool, clearCanvas, nodes } = useCanvasStore();
  const { zoomIn, zoomOut, fitView, deleteElements, getNodes, getEdges } = useReactFlow();

  const [hasSelection, setHasSelection] = useState(false);
  const [isDownloading, setIsDownloading] = useState<'png' | 'pdf' | null>(null);

  useEffect(() => {
    const checkSelection = () => {
      const selectedNodes = nodes.some(n => (n as any).selected); 

      setHasSelection(selectedNodes);
    };
    checkSelection();
  }, [nodes]);

  const downloadImage = async (format: 'png' | 'pdf') => {
    setIsDownloading(format);
    try {

      const viewportElement = document.querySelector('.react-flow__viewport') as HTMLElement;

      if (!viewportElement) {
        throw new Error("Canvas viewport not found");
      }

      const nodes = getNodes();
      if (nodes.length === 0) {
        alert("Canvas is empty!");
        setIsDownloading(null);
        return;
      }

      const nodesBounds = getRectOfNodes(nodes);

      const imageWidth = nodesBounds.width;
      const imageHeight = nodesBounds.height;
      const transform = getTransformForBounds(nodesBounds, nodesBounds.width, nodesBounds.height, 0.5, 2);

      const dataUrl = await toPng(viewportElement, {
        backgroundColor: '#ffffff', 
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },

        filter: (node) => {

            return true;
        }
      });

      if (format === 'png') {
        const a = document.createElement('a');
        a.setAttribute('download', 'network-topology.png');
        a.setAttribute('href', dataUrl);
        a.click();
      } else if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: imageWidth > imageHeight ? 'l' : 'p',
          unit: 'px',
          format: [imageWidth + 50, imageHeight + 50] 
        });
        pdf.addImage(dataUrl, 'PNG', 25, 25, imageWidth, imageHeight);
        pdf.save('network-topology.pdf');
      }

    } catch (error) {
      console.error("Failed to download:", error);
      alert("Failed to export canvas.");
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDelete = useCallback(() => {
    const nodesToDelete = getNodes().filter((node) => node.selected);
    const edgesToDelete = getEdges().filter((edge) => edge.selected);

    if (nodesToDelete.length > 0 || edgesToDelete.length > 0) {
      deleteElements({ nodes: nodesToDelete, edges: edgesToDelete });
    } else {
      if (confirm("Are you sure you want to clear the entire canvas?")) {
        clearCanvas();
      }
    }
  }, [deleteElements, getNodes, getEdges, clearCanvas]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`flex items-center gap-1 p-1 bg-background/80 backdrop-blur-md border border-border shadow-sm rounded-lg ${className}`}>

        {}
        <div className="flex items-center gap-0.5 px-1">
          <ToolBtn icon={Undo2} label="Undo" onClick={() => {}} shortcut="Ctrl+Z" disabled />
          <ToolBtn icon={Redo2} label="Redo" onClick={() => {}} shortcut="Ctrl+Y" disabled />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn
                icon={MousePointer2}
                label="Select"
                isActive={activeTool === "select"}
                onClick={() => setActiveTool("select")}
                shortcut="V"
            />
            <ToolBtn
                icon={Hand}
                label="Pan"
                isActive={activeTool === "pan"}
                onClick={() => setActiveTool("pan")}
                shortcut="H"
            />
            <ToolBtn
                icon={Cable}
                label="Connect"
                isActive={activeTool === "connect"}
                onClick={() => setActiveTool("connect")}
                shortcut="C"
            />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn icon={ZoomOut} label="Zoom Out" onClick={() => zoomOut()} />
            <ToolBtn icon={ZoomIn} label="Zoom In" onClick={() => zoomIn()} />
            <ToolBtn icon={Maximize} label="Fit View" onClick={() => fitView({ padding: 0.2 })} />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn
              icon={FileImage}
              label="Download PNG"
              onClick={() => downloadImage('png')}
              isLoading={isDownloading === 'png'}
            />
            <ToolBtn
              icon={FileText}
              label="Download PDF"
              onClick={() => downloadImage('pdf')}
              isLoading={isDownloading === 'pdf'}
            />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn
                icon={Trash2}
                label="Delete / Clear"
                onClick={handleDelete}
                variant="ghost"
                shortcut="Del"
            />
        </div>
      </div>
    </TooltipProvider>
  );
}
