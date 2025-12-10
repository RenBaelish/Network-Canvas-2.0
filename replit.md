# Network Canvas (NetVas)

## Overview
Network Canvas (NetVas) is a visual network topology designer - a lightweight web-based tool similar to Cisco Packet Tracer. Users can drag and drop network devices (routers, switches, PCs) onto a canvas and create visual network diagrams.

## Current State
- MVP Complete: Fully functional drag & drop canvas with device library
- No database required - works as a client-side tool
- Responsive design with mobile drawer and desktop sidebar

## Project Architecture

### Frontend (client/src/)
- **Framework:** React with TypeScript
- **Routing:** Wouter
- **State Management:** Zustand (`store/useCanvasStore.ts`)
- **Canvas Library:** React Flow
- **Styling:** Tailwind CSS with Shadcn UI components

### Key Files
- `shared/canvas.ts` - TypeScript interfaces (DeviceNode, Connection, Position)
- `store/useCanvasStore.ts` - Zustand store for canvas state
- `components/NetworkCanvas.tsx` - React Flow canvas implementation
- `components/DeviceSidebar.tsx` - Device library sidebar
- `components/CanvasToolbar.tsx` - Select/Pan/Connect tools
- `pages/Home.tsx` - Landing page
- `pages/Canvas.tsx` - Main canvas editor

### Routes
- `/` - Landing page with hero section and CTA
- `/canvas` - Main canvas editor

## Features
1. **Drag & Drop Devices:** Router, Switch, PC from sidebar to canvas
2. **Move Devices:** Reposition nodes by dragging on canvas
3. **Connect Devices:** Use Connect tool to create connections between nodes
4. **Delete Nodes:** Select a node and click the delete button
5. **Tool Modes:** Select (default), Pan (scroll canvas), Connect (create links)
6. **Responsive:** Mobile drawer sidebar, desktop collapsible sidebar
7. **Dark/Light Mode:** Theme toggle in header

## Data Model
```typescript
interface DeviceNode {
  id: string;
  type: "router" | "switch" | "pc";
  position: { x: number; y: number };
  label: string;
}

interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
}
```

## Running the Application
```bash
npm run dev
```
The app runs on port 5000.
