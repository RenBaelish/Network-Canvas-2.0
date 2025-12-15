import { create } from "zustand";
import type { DeviceNode, Connection, DeviceType, Position } from "@shared/canvas";

interface CanvasStore {
  nodes: DeviceNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  activeTool: "select" | "pan" | "connect";
  connectingFromNodeId: string | null;

  // --- Actions for Nodes ---
  addNode: (type: DeviceType, position: Position) => void;
  updateNodePosition: (id: string, position: Position) => void;
  updateNodeLabel: (id: string, label: string) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;

  // --- Tools ---
  setActiveTool: (tool: "select" | "pan" | "connect") => void;

  // --- Actions for Connections ---
  addConnection: (connection: Connection) => void;
  startConnection: (fromNodeId: string) => void;
  completeConnection: (toNodeId: string) => void;
  cancelConnection: () => void;
  removeConnection: (id: string) => void;

  // --- Global Actions ---
  clearCanvas: () => void;
}

// Helpers untuk generate ID unik
const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const generateConnectionId = () => `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper: Generate Label Otomatis
const getDeviceLabel = (type: DeviceType, nodes: DeviceNode[]): string => {
  // Khusus untuk Text Node, kita tidak perlu penomoran otomatis
  if (type === 'text') return "Text Label";

  const typeNodes = nodes.filter((n) => n.type === type);
  const count = typeNodes.length + 1;

  // Mapping prefix label untuk semua tipe device
  // Menggunakan Record<string, string> agar aman meskipun tipe baru ditambahkan
  const prefixes: Record<string, string> = {
    router: "Router",
    switch: "Switch",
    pc: "PC",
    laptop: "Laptop",
    server: "Server",
    firewall: "Firewall",
    access_point: "AP",
    cloud: "Cloud",
    internet: "Internet",
    database: "DB",
    text: "Label"
  };

  const prefix = prefixes[type] || "Device";
  return `${prefix}-${count}`;
};

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: [],
  connections: [],
  selectedNodeId: null,
  activeTool: "select",
  connectingFromNodeId: null,

  // --- NODE ACTIONS ---

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
      // Hapus otomatis koneksi yang terhubung ke node yang dihapus
      connections: state.connections.filter(
        (conn) => conn.fromNodeId !== id && conn.toNodeId !== id
      ),
      // Reset seleksi jika node yang dihapus sedang dipilih
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
    }));
  },

  selectNode: (id) => {
    set({ selectedNodeId: id });
  },

  setActiveTool: (tool) => {
    set({ activeTool: tool, connectingFromNodeId: null });
  },

  // --- CONNECTION ACTIONS ---

  // Dipanggil oleh ReactFlow onConnect untuk menyimpan kabel baru
  addConnection: (connection) => {
    set((state) => {
      // Validasi sederhana: Cek duplikasi koneksi (opsional)
      // Kita cek apakah sudah ada koneksi antara Source & Target yang sama di Handle yang sama
      const exists = state.connections.some(
        (c) =>
          c.fromNodeId === connection.fromNodeId &&
          c.toNodeId === connection.toNodeId &&
          c.sourceHandle === connection.sourceHandle &&
          c.targetHandle === connection.targetHandle
      );

      if (exists) return state;

      return {
        connections: [...state.connections, connection]
      };
    });
  },

  // Manual connection logic (jika menggunakan tool Connect klik-klik manual)
  startConnection: (fromNodeId) => {
    set({ connectingFromNodeId: fromNodeId });
  },

  completeConnection: (toNodeId) => {
    const { connectingFromNodeId, connections } = get();
    // Validasi: Tidak bisa connect ke diri sendiri atau jika belum ada source
    if (!connectingFromNodeId || connectingFromNodeId === toNodeId) {
      set({ connectingFromNodeId: null });
      return;
    }

    // Cek duplikasi koneksi dasar
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
        // Note: Manual connection click biasanya tidak spesifik handle,
        // jadi sourceHandle/targetHandle bisa null atau default 'top'/'bottom'
        sourceHandle: null,
        targetHandle: null
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

  // --- GLOBAL ACTIONS ---

  clearCanvas: () => {
    set({
      nodes: [],
      connections: [],
      selectedNodeId: null,
      connectingFromNodeId: null,
    });
  },
}));
