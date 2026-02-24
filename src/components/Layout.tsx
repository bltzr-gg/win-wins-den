import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background grain">
      {!isMobile && <TopNav />}
      <main className={`max-w-hub mx-auto ${isMobile ? 'pb-20' : 'py-8 px-6'}`}>
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Layout;
