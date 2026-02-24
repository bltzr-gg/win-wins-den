import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Entry from "./pages/Entry";
import Hub from "./pages/Hub";
import Tasks from "./pages/Tasks";
import Leaderboard from "./pages/Leaderboard";
import Badges from "./pages/Badges";
import Referrals from "./pages/Referrals";
import Wager from "./pages/Wager";
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
          <Route path="/" element={<Entry />} />
          <Route element={<Layout />}>
            <Route path="/hub" element={<Hub />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/wager" element={<Wager />} />
            <Route path="/switch" element={<SwitchBonus />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
