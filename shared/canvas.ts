import { z } from "zod";

export type DeviceType = "router" | "switch" | "pc";

export interface Position {
  x: number;
  y: number;
}

export interface DeviceNode {
  id: string;
  type: DeviceType;
  position: Position;
  label: string;
}

export interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
}

export interface CanvasState {
  nodes: DeviceNode[];
  connections: Connection[];
  selectedNodeId: string | null;
  activeTool: "select" | "pan" | "connect";
}

export const deviceNodeSchema = z.object({
  id: z.string(),
  type: z.enum(["router", "switch", "pc"]),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  label: z.string(),
});

export const connectionSchema = z.object({
  id: z.string(),
  fromNodeId: z.string(),
  toNodeId: z.string(),
});

export type InsertDeviceNode = z.infer<typeof deviceNodeSchema>;
export type InsertConnection = z.infer<typeof connectionSchema>;
