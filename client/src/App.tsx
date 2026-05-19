import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Canvas from "@/pages/Canvas";
import Features from "@/pages/Features";
import Guide from "@/pages/Guide";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/canvas" component={Canvas} />
      <Route path="/features" component={Features} /> {}
    <Route path="/guide" component={Guide} />
      {}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
