import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import HeaderBar from "./HeaderBar";
import PromoBanner from "./PromoBanner";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background grain">
      <PromoBanner />
      {!isMobile && <TopNav />}
      <HeaderBar />
      <main className={`max-w-hub mx-auto ${isMobile ? 'px-4 pb-24 pt-4' : 'py-8 px-6'}`}>
        <Outlet />
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Layout;
