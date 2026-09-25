import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <div className="min-h-svh pb-24">
      {offline && (
        <div className="sticky top-0 z-40 bg-sand px-5 py-2 text-center text-sm text-muted-foreground">
          Si offline — zobrazujeme uložené slová.
        </div>
      )}
      <Outlet />
      <BottomNav />
    </div>
  );
}
