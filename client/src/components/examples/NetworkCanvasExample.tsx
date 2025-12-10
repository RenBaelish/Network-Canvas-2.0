import { ReactFlowProvider } from "reactflow";
import { NetworkCanvas } from "../NetworkCanvas";

export default function NetworkCanvasExample() {
  return (
    <ReactFlowProvider>
      <div className="h-[500px] w-full border border-card-border rounded-lg overflow-hidden">
        <NetworkCanvas />
      </div>
    </ReactFlowProvider>
  );
}
