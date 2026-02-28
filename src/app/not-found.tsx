import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-6xl text-primary">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-crimson-deep to-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
