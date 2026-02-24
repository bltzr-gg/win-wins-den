import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-6xl text-primary">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link
          to="/hub"
          className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
