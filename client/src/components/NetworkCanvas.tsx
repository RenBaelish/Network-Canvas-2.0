import { useCallback, useRef, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection as FlowConnection,
  type NodeTypes,
  type OnConnect,
  Handle,
  Position,
  type NodeProps,
  ConnectionLineType,
  MarkerType,
  ConnectionMode, 
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Router, Network, MonitorSmartphone, Server, Cloud,
  ShieldCheck, Wifi, Laptop, Database, Globe, X, Type
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/store/useCanvasStore";
import type { DeviceType } from "@shared/canvas";

const deviceIcons: Record<string, any> = {
  router: Router,
  switch: Network,
  pc: MonitorSmartphone,
  server: Server,
  cloud: Cloud,
  firewall: ShieldCheck,
  access_point: Wifi,
  laptop: Laptop,
  database: Database,
  internet: Globe,
  text: Type, 
};

const deviceColors: Record<string, string> = {
  router: "bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400",
  switch: "bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400",
  access_point: "bg-blue-500/10 border-blue-500/50 text-blue-600 dark:text-blue-400",
  pc: "bg-purple-500/10 border-purple-500/50 text-purple-600 dark:text-purple-400",
  laptop: "bg-purple-500/10 border-purple-500/50 text-purple-600 dark:text-purple-400",
  server: "bg-purple-500/10 border-purple-500/50 text-purple-600 dark:text-purple-400",
  firewall: "bg-orange-500/10 border-orange-500/50 text-orange-600 dark:text-orange-400",
  cloud: "bg-slate-500/10 border-slate-500/50 text-slate-600 dark:text-slate-400",
  internet: "bg-slate-500/10 border-slate-500/50 text-slate-600 dark:text-slate-400",
  database: "bg-slate-500/10 border-slate-500/50 text-slate-600 dark:text-slate-400",
  text: "bg-transparent border-transparent", 
};

const CustomHandle = ({ position, id }: { position: Position; id: string }) => {
  return (
    <Handle
      type="source" 
      position={position}
      id={id}
      className="!w-4 !h-4 !bg-transparent !border-none z-50 flex items-center justify-center hover:scale-125 transition-transform"
      style={{

        ...(position === Position.Top && { top: -8 }),
        ...(position === Position.Bottom && { bottom: -8 }),
        ...(position === Position.Left && { left: -8 }),
        ...(position === Position.Right && { right: -8 }),
      }}
    >
      {}
      <div className="w-2.5 h-2.5 bg-primary border-2 border-background rounded-full pointer-events-none" />
    </Handle>
  );
};

interface DeviceNodeData {
  label: string;
  deviceType: DeviceType;
  onDelete: (id: string) => void;
}

function TextNodeComponent({ id, data, selected }: NodeProps<DeviceNodeData>) {
  const { updateNodeLabel, removeNode } = useCanvasStore();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  };

  return (
    <div
      className={`
        relative group min-w-[50px] min-h-[30px] flex items-center justify-center
        ${selected ? "ring-2 ring-primary ring-offset-4 ring-offset-background rounded-md" : ""}
      `}
      onDoubleClick={() => setIsEditing(true)}
    >
      {}
      {selected && !isEditing && (
        <div className="absolute -top-4 -right-4 z-[60]">
           <Button
            variant="destructive"
            size="icon"
            className="w-5 h-5 rounded-full shadow-sm p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {isEditing ? (

        <input
          ref={inputRef}
          type="text"
          defaultValue={data.label}
          onBlur={(e) => {
            setIsEditing(false);
            updateNodeLabel(id, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              updateNodeLabel(id, e.currentTarget.value);
            }
          }}
          className="nodrag bg-background border border-primary rounded px-2 py-1 text-sm font-medium focus:outline-none min-w-[100px] text-center shadow-sm"
        />
      ) : (

        <span className="text-lg font-bold text-foreground/90 px-2 py-1 cursor-text whitespace-nowrap">
          {data.label}
        </span>
      )}
    </div>
  );
}

function DeviceNodeComponent({ id, data, selected }: NodeProps<DeviceNodeData>) {

  if (data.deviceType === 'text') {
    return <TextNodeComponent id={id} data={data} selected={selected} type="deviceNode" xPos={0} yPos={0} isConnectable={false} dragging={false} zIndex={0} />;
  }

  const Icon = deviceIcons[data.deviceType] || Network;
  const colorClass = deviceColors[data.deviceType] || "bg-card border-border";

  return (
    <div
      className={`
        relative flex flex-col items-center p-3 rounded-lg border-2 bg-card shadow-sm transition-all duration-200
        ${colorClass}
        ${selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md scale-105" : ""}
        min-w-[90px] group
      `}
    >
      {}
      <CustomHandle position={Position.Top} id="top" />
      <CustomHandle position={Position.Right} id="right" />
      <CustomHandle position={Position.Bottom} id="bottom" />
      <CustomHandle position={Position.Left} id="left" />

      {}
      {selected && (
        <div className="absolute -top-3 -right-3 z-[60]">
           <Button
            variant="destructive"
            size="icon"
            className="w-6 h-6 rounded-full shadow-sm p-0"
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete(id);
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {}
      <div className="w-10 h-10 flex items-center justify-center mb-2 pointer-events-none">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>

      {}
      <span className="text-[10px] font-bold text-foreground/90 text-center max-w-[100px] truncate px-1 select-none pointer-events-none bg-background/50 rounded-sm">
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  deviceNode: DeviceNodeComponent,
};

export function NetworkCanvas({ className }: { className?: string }) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const {
    nodes: storeNodes,
    connections: storeConnections,
    addNode,
    updateNodePosition,
    removeNode,
    removeConnection,
    addConnection,
    activeTool
  } = useCanvasStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    setNodes((currentNodes) => {

      const selectionMap = new Map(currentNodes.map(n => [n.id, n.selected]));
      return storeNodes.map((node) => ({
        id: node.id,
        type: "deviceNode",
        position: node.position,
        selected: selectionMap.get(node.id) || false,
        data: {
          label: node.label,
          deviceType: node.type,
          onDelete: removeNode,
        },
      }));
    });
  }, [storeNodes, removeNode, setNodes]);

  useEffect(() => {
    setEdges((currentEdges) => {
       const selectionMap = new Map(currentEdges.map(e => [e.id, e.selected]));
       return storeConnections.map((conn) => ({
        id: conn.id,
        source: conn.fromNodeId,
        target: conn.toNodeId,
        sourceHandle: conn.sourceHandle,
        targetHandle: conn.targetHandle,
        type: "smoothstep", 
        selected: selectionMap.get(conn.id) || false,
        style: { stroke: "hsl(var(--foreground))", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15 },
        interactionWidth: 25, 
      }));
    });
  }, [storeConnections, setEdges]);

  const onNodesDelete = useCallback((deleted: any[]) => deleted.forEach((n) => removeNode(n.id)), [removeNode]);
  const onEdgesDelete = useCallback((deleted: any[]) => deleted.forEach((e) => removeConnection(e.id)), [removeConnection]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const deviceType = event.dataTransfer.getData("deviceType") as DeviceType;
      if (!deviceType || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(deviceType, position);
    },
    [addNode, reactFlowInstance]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect: OnConnect = useCallback(
    (params: FlowConnection) => {
      const newConnection = {
        id: `e-${params.source}-${params.target}-${Date.now()}`,
        fromNodeId: params.source!,
        toNodeId: params.target!,
        sourceHandle: params.sourceHandle, 
        targetHandle: params.targetHandle
      };
      addConnection(newConnection);
    },
    [addConnection]
  );

  const panOnDrag = activeTool === "pan" ? [0, 1, 2] : [1, 2];

  return (
    <div ref={reactFlowWrapper} className={`w-full h-full bg-slate-50 dark:bg-zinc-950 ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={(_, node) => updateNodePosition(node.id, node.position)}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}

        defaultViewport={{ x: 0, y: 0, zoom: 1 }} 
        fitViewOptions={{ maxZoom: 1 }}
        minZoom={0.1}
        maxZoom={4}

        connectionMode={ConnectionMode.Loose} 
        panOnDrag={panOnDrag}
        selectionOnDrag={activeTool === "select"}
        panOnScroll={activeTool === "pan"}
        zoomOnScroll={true}
        connectOnClick={activeTool === "connect"}

        connectionLineType={ConnectionLineType.SmoothStep}
        snapToGrid={true}
        snapGrid={[20, 20]}

        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { strokeWidth: 2, stroke: 'hsl(var(--primary))' },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}

        selectionKeyCode={['Shift']}
        multiSelectionKeyCode={['Control', 'Meta']}
        deleteKeyCode={['Backspace', 'Delete']}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#94a3b8" gap={24} size={1} variant={"dots" as any} />
        <Controls position="bottom-right" className="bg-card border border-border shadow-md" />
        <MiniMap
            position="bottom-left"
            className="!bg-card !border-border rounded-lg overflow-hidden shadow-lg"
            nodeColor={(n) => {
                const type = n.data?.deviceType;
                if(type === 'text') return 'transparent';
                if(type === 'router' || type === 'switch') return '#3b82f6';
                if(type === 'firewall') return '#f97316';
                return '#a855f7';
            }}
        />
      </ReactFlow>
    </div>
  );
}
