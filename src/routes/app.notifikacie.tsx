import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Screen, Tag } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifikacie")({
  head: () => ({
    meta: [
      { title: "Notifikácie — Slovko" },
      { name: "description", content: "Nastav si jemné pripomienky nových slov." },
      { property: "og:title", content: "Notifikácie — Slovko" },
      { property: "og:description", content: "Kedy a ako často ti máme pripomenúť slovo." },
    ],
  }),
  component: Notifications,
});

const contents = ["Slovo dňa s príkladom", "Len slovo", "Opakovanie uložených"];

function Notifications() {
  const { profile, setNotifications } = useStore();
  const n = profile.notifications;
  return (
    <Screen
      title="Notifikácie"
      action={
        <Link to="/app/profil" className="tap flex items-center text-sm text-muted-foreground">
          ← Späť
        </Link>
      }
    >
      <div className="space-y-4">
        <div className="rounded-3xl bg-sand p-4">
          <p className="mb-2 text-xs text-muted-foreground">Náhľad</p>
          <div className="surface p-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>SLOVKO</span>
              <span>{n.time}</span>
            </div>
            <p className="font-display mt-1 text-lg font-semibold">linger</p>
            {n.content !== "Len slovo" && (
              <p className="text-sm text-muted-foreground">
                „We linger at the table long after the coffee goes cold.“
              </p>
            )}
          </div>
        </div>

        <Card className="flex items-center justify-between">
          <span className="font-medium">Pripomienky</span>
          <button
            role="switch"
            aria-checked={n.enabled}
            onClick={() => setNotifications({ enabled: !n.enabled })}
            className="tap flex items-center justify-center"
          >
            <span className={cn("relative h-7 w-12 rounded-full transition-colors", n.enabled ? "bg-primary" : "bg-secondary")}>
              <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-card shadow-soft transition-all", n.enabled ? "left-6" : "left-1")} />
            </span>
          </button>
        </Card>

        <div className={cn("space-y-4 transition-opacity", !n.enabled && "pointer-events-none opacity-40")}>
          <Card>
            <label className="flex items-center justify-between">
              <span className="font-medium">Čas</span>
              <input
                type="time"
                value={n.time}
                onChange={(e) => setNotifications({ time: e.target.value })}
                className="tap rounded-xl border border-border bg-card px-3"
              />
            </label>
          </Card>
          <Card>
            <p className="mb-3 font-medium">Počet denne</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((k) => (
                <Tag key={k} active={n.perDay === k} onClick={() => setNotifications({ perDay: k })}>
                  {k}×
                </Tag>
              ))}
            </div>
          </Card>
          <Card>
            <p className="mb-3 font-medium">Obsah</p>
            <div className="flex flex-wrap gap-2">
              {contents.map((c) => (
                <Tag key={c} active={n.content === c} onClick={() => setNotifications({ content: c })}>
                  {c}
                </Tag>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Screen>
  );
}
