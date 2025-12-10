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
} from "reactflow";
import "reactflow/dist/style.css";
import { Router, Network, MonitorSmartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/store/useCanvasStore";
import type { DeviceType } from "@shared/canvas";

const deviceIcons: Record<DeviceType, typeof Router> = {
  router: Router,
  switch: Network,
  pc: MonitorSmartphone,
};

const deviceColors: Record<DeviceType, string> = {
  router: "bg-blue-500/10 border-blue-500/30 dark:bg-blue-500/20 dark:border-blue-500/40",
  switch: "bg-green-500/10 border-green-500/30 dark:bg-green-500/20 dark:border-green-500/40",
  pc: "bg-purple-500/10 border-purple-500/30 dark:bg-purple-500/20 dark:border-purple-500/40",
};

interface DeviceNodeData {
  label: string;
  deviceType: DeviceType;
  onDelete: (id: string) => void;
}

function DeviceNodeComponent({ id, data, selected }: NodeProps<DeviceNodeData>) {
  const Icon = deviceIcons[data.deviceType];
  const colorClass = deviceColors[data.deviceType];

  return (
    <div
      className={`relative flex flex-col items-center p-3 rounded-lg border-2 bg-card ${colorClass} ${
        selected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      } min-w-24 transition-all duration-150`}
      data-testid={`canvas-node-${id}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />

      {selected && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            data.onDelete(id);
          }}
          data-testid={`button-delete-node-${id}`}
        >
          <X className="w-3 h-3" />
        </Button>
      )}

      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted mb-2">
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <span className="text-xs font-medium text-foreground text-center whitespace-nowrap">
        {data.label}
      </span>
    </div>
  );
}

const nodeTypes: NodeTypes = {
  deviceNode: DeviceNodeComponent,
};

interface NetworkCanvasProps {
  className?: string;
}

export function NetworkCanvas({ className }: NetworkCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const { 
    nodes: storeNodes, 
    connections: storeConnections,
    addNode, 
    updateNodePosition, 
    removeNode, 
    activeTool 
  } = useCanvasStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const flowNodes: Node<DeviceNodeData>[] = storeNodes.map((node) => ({
      id: node.id,
      type: "deviceNode",
      position: node.position,
      data: {
        label: node.label,
        deviceType: node.type,
        onDelete: (id: string) => {
          removeNode(id);
          setNodes((nds) => nds.filter((n) => n.id !== id));
          setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
        },
      },
    }));
    setNodes(flowNodes);
  }, [storeNodes, removeNode, setNodes, setEdges]);

  useEffect(() => {
    const flowEdges: Edge[] = storeConnections.map((conn) => ({
      id: conn.id,
      source: conn.fromNodeId,
      target: conn.toNodeId,
      type: "smoothstep",
      animated: true,
      style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
    }));
    setEdges(flowEdges);
  }, [storeConnections, setEdges]);

  const onConnect: OnConnect = useCallback(
    (params: FlowConnection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "hsl(var(--primary))", strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const deviceType = event.dataTransfer.getData("deviceType") as DeviceType;
      if (!deviceType || !reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      addNode(deviceType, position);
    },
    [addNode, reactFlowInstance]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
      updateNodePosition(node.id, node.position);
    },
    [updateNodePosition]
  );

  const panOnDrag = activeTool === "pan" ? [0, 1, 2] : [1, 2];
  const connectOnClick = activeTool === "connect";

  return (
    <div
      ref={reactFlowWrapper}
      className={`w-full h-full ${className}`}
      data-testid="network-canvas"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={onNodeDragStop}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        panOnDrag={panOnDrag}
        selectionOnDrag={activeTool === "select"}
        panOnScroll={activeTool === "pan"}
        zoomOnScroll={true}
        connectOnClick={connectOnClick}
        fitView
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="hsl(var(--muted-foreground))" gap={20} size={1} />
        <Controls
          className="!bg-card !border-card-border !shadow-md"
          showInteractive={false}
        />
        <MiniMap
          className="!bg-card !border-card-border"
          nodeColor={(node) => {
            const colors: Record<DeviceType, string> = {
              router: "#3b82f6",
              switch: "#22c55e",
              pc: "#a855f7",
            };
            return colors[(node.data as DeviceNodeData)?.deviceType] || "#888";
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}

export default NetworkCanvas;
