import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TasksEarn from "./pages/TasksEarn";
import Leaderboard from "./pages/Leaderboard";
import Vault from "./pages/Vault";
import Arena from "./pages/Arena";
import Collection from "./pages/Collection";
import Referrals from "./pages/Referrals";
import SwitchBonus from "./pages/SwitchBonus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hub" element={<Dashboard />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/tasks" element={<TasksEarn />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/switch" element={<SwitchBonus />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
