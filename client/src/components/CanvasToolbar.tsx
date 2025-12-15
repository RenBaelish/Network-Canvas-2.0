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

// Helper Button Component
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
  const [isDownloading, setIsDownloading] = useState(false);

  // Deteksi Selection
  useEffect(() => {
    const checkSelection = () => {
      const selectedNodes = nodes.some(n => n.selected); // Cek dari store atau reactflow state jika ada
      // Untuk akurasi ReactFlow state, kita bisa pakai useStoreApi, tapi
      // cara paling simpel kita cek manual saat render atau pass selection state
      // (Untuk simplifikasi, tombol delete akan selalu aktif jika ada nodes)
      setHasSelection(selectedNodes);
    };
    checkSelection();
  }, [nodes]);

  // --- LOGIC DOWNLOAD GAMBAR & PDF ---
  const downloadImage = async (format: 'png' | 'pdf') => {
    setIsDownloading(true);
    try {
      // 1. Ambil elemen viewport React Flow
      // Kita menargetkan class internal react-flow untuk menangkap kontennya saja
      const viewportElement = document.querySelector('.react-flow__viewport') as HTMLElement;

      if (!viewportElement) {
        throw new Error("Canvas viewport not found");
      }

      // 2. Hitung area (bounds) dari semua node agar gambar pas (tidak terpotong)
      const nodes = getNodes();
      if (nodes.length === 0) {
        alert("Canvas is empty!");
        setIsDownloading(false);
        return;
      }

      // Menggunakan helper reactflow untuk mendapatkan kotak pembatas semua node
      const nodesBounds = getRectOfNodes(nodes);

      // Tambahkan padding agar gambar tidak terlalu mepet
      const imageWidth = nodesBounds.width;
      const imageHeight = nodesBounds.height;
      const transform = getTransformForBounds(nodesBounds, nodesBounds.width, nodesBounds.height, 0.5, 2);

      // 3. Konversi ke PNG (Data URL)
      const dataUrl = await toPng(viewportElement, {
        backgroundColor: '#ffffff', // Pastikan background putih (atau transparan jika dihapus)
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
        },
        // Filter elemen yang tidak diinginkan (opsional)
        filter: (node) => {
            // Jangan ikutkan elemen control/minimap jika mereka berada di dalam viewport (biasanya sih diluar)
            return true;
        }
      });

      // 4. Proses Download sesuai format
      if (format === 'png') {
        const a = document.createElement('a');
        a.setAttribute('download', 'network-topology.png');
        a.setAttribute('href', dataUrl);
        a.click();
      } else if (format === 'pdf') {
        const pdf = new jsPDF({
          orientation: imageWidth > imageHeight ? 'l' : 'p',
          unit: 'px',
          format: [imageWidth + 50, imageHeight + 50] // Ukuran PDF menyesuaikan gambar + margin
        });
        pdf.addImage(dataUrl, 'PNG', 25, 25, imageWidth, imageHeight);
        pdf.save('network-topology.pdf');
      }

    } catch (error) {
      console.error("Failed to download:", error);
      alert("Failed to export canvas.");
    } finally {
      setIsDownloading(false);
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

        {/* History Group */}
        <div className="flex items-center gap-0.5 px-1">
          <ToolBtn icon={Undo2} label="Undo" onClick={() => {}} shortcut="Ctrl+Z" disabled />
          <ToolBtn icon={Redo2} label="Redo" onClick={() => {}} shortcut="Ctrl+Y" disabled />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {/* Tools Group */}
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

        {/* Zoom Group */}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn icon={ZoomOut} label="Zoom Out" onClick={() => zoomOut()} />
            <ToolBtn icon={ZoomIn} label="Zoom In" onClick={() => zoomIn()} />
            <ToolBtn icon={Maximize} label="Fit View" onClick={() => fitView({ padding: 0.2 })} />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {/* Export Group (NEW) */}
        <div className="flex items-center gap-0.5 px-1">
            <ToolBtn
              icon={FileImage}
              label="Download PNG"
              onClick={() => downloadImage('png')}
              isLoading={isDownloading}
            />
            <ToolBtn
              icon={FileText}
              label="Download PDF"
              onClick={() => downloadImage('pdf')}
              isLoading={isDownloading}
            />
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {/* Actions Group */}
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
