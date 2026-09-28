import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button, Card, Screen } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categoryBySlug } from "@/lib/words";

export const Route = createFileRoute("/app/profil")({
  head: () => ({
    meta: [
      { title: "Profil — Slovko" },
      { name: "description", content: "Tvoj profil, denný cieľ a jednoduchá štatistika." },
      { property: "og:title", content: "Profil — Slovko" },
      { property: "og:description", content: "Tvoje nastavenia a pokrok v Slovku." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { profile, saved, liked, signOut } = useStore();
  const navigate = useNavigate();
  const week = [3, 5, 2, 5, 4, 1, saved.length % 6];
  const days = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

  return (
    <Screen title={profile.name || "Profil"} subtitle={`${profile.language} · ${profile.level}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            [saved.length, "uložených"],
            [liked.length, "obľúbených"],
            [profile.goal, "denný cieľ"],
          ].map(([n, l]) => (
            <Card key={l} className="p-4 text-center">
              <div className="font-display text-3xl font-semibold">{n}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-lg">Tento týždeň</h2>
          <p className="text-sm text-muted-foreground">Každé objavené slovo sa počíta.</p>
          <div className="mt-4 flex h-24 items-end justify-between gap-2">
            {week.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-full bg-primary-soft"
                  style={{ height: `${Math.max(8, (v / 5) * 72)}px` }}
                />
                <span className="text-[0.7rem] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg">Moje kategórie</h2>
          <div className="flex flex-wrap gap-2">
            {profile.categories.map((s) => (
              <span key={s} className="rounded-full bg-sand px-3 py-1.5 text-sm">
                {categoryBySlug(s)?.name}
              </span>
            ))}
          </div>
        </Card>

        <div className="surface divide-y divide-border">
          <Link to="/app/notifikacie" className="tap flex items-center justify-between px-5 py-4">
            Notifikácie <span className="text-muted-foreground">›</span>
          </Link>
          <Link to="/onboarding" className="tap flex items-center justify-between px-5 py-4">
            Upraviť profil <span className="text-muted-foreground">›</span>
          </Link>
        </div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
        >
          Odhlásiť sa
        </Button>
      </div>
    </Screen>
  );
}
