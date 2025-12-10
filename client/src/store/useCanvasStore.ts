import { create } from "zustand";
import type { DeviceNode, Connection, DeviceType, Position } from "@shared/canvas";

interface CanvasStore {
  nodes: DeviceNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  activeTool: "select" | "pan" | "connect";
  connectingFromNodeId: string | null;
  
  addNode: (type: DeviceType, position: Position) => void;
  updateNodePosition: (id: string, position: Position) => void;
  updateNodeLabel: (id: string, label: string) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  setActiveTool: (tool: "select" | "pan" | "connect") => void;
  
  startConnection: (fromNodeId: string) => void;
  completeConnection: (toNodeId: string) => void;
  cancelConnection: () => void;
  removeConnection: (id: string) => void;
  
  clearCanvas: () => void;
}

const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const generateConnectionId = () => `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getDeviceLabel = (type: DeviceType, nodes: DeviceNode[]): string => {
  const typeNodes = nodes.filter((n) => n.type === type);
  const count = typeNodes.length + 1;
  const prefixes: Record<DeviceType, string> = {
    router: "Router",
    switch: "Switch",
    pc: "PC",
  };
  return `${prefixes[type]}-${count}`;
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: [],
  connections: [],
  selectedNodeId: null,
  activeTool: "select",
  connectingFromNodeId: null,

  addNode: (type, position) => {
    const { nodes } = get();
    const newNode: DeviceNode = {
      id: generateId(),
      type,
      position,
      label: getDeviceLabel(type, nodes),
    };
    set({ nodes: [...nodes, newNode] });
  },

  updateNodePosition: (id, position) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, position } : node
      ),
    }));
  },

  updateNodeLabel: (id, label) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, label } : node
      ),
    }));
  },

  removeNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      connections: state.connections.filter(
        (conn) => conn.fromNodeId !== id && conn.toNodeId !== id
      ),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  selectNode: (id) => {
    set({ selectedNodeId: id });
  },

  setActiveTool: (tool) => {
    set({ activeTool: tool, connectingFromNodeId: null });
  },

  startConnection: (fromNodeId) => {
    set({ connectingFromNodeId: fromNodeId });
  },

  completeConnection: (toNodeId) => {
    const { connectingFromNodeId, connections } = get();
    if (!connectingFromNodeId || connectingFromNodeId === toNodeId) {
      set({ connectingFromNodeId: null });
      return;
    }

    const existingConnection = connections.find(
      (conn) =>
        (conn.fromNodeId === connectingFromNodeId && conn.toNodeId === toNodeId) ||
        (conn.fromNodeId === toNodeId && conn.toNodeId === connectingFromNodeId)
    );

    if (!existingConnection) {
      const newConnection: Connection = {
        id: generateConnectionId(),
        fromNodeId: connectingFromNodeId,
        toNodeId,
      };
      set({
        connections: [...connections, newConnection],
        connectingFromNodeId: null,
      });
    } else {
      set({ connectingFromNodeId: null });
    }
  },

  cancelConnection: () => {
    set({ connectingFromNodeId: null });
  },

  removeConnection: (id) => {
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== id),
    }));
  },

  clearCanvas: () => {
    set({
      nodes: [],
      connections: [],
      selectedNodeId: null,
      connectingFromNodeId: null,
    });
  },
}));
