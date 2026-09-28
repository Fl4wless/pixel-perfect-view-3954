import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Skeleton, EmptyState, Button } from "@/components/ui-kit";
import { WordCard } from "@/components/word-card";
import { useStore } from "@/lib/store";
import { words } from "@/lib/words";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dnešné slová — Slovko" },
      {
        name: "description",
        content: "Tvoj denný feed nových slov s definíciou, výslovnosťou a príkladom vo vete.",
      },
      { property: "og:title", content: "Dnešné slová — Slovko" },
      { property: "og:description", content: "Scrolluj dnešnými slovami vo svojom tempe." },
    ],
  }),
  component: Feed,
});

function Feed() {
  const { profile, saved, liked, ready } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  const picked = profile.categories.length
    ? words.filter((w) => profile.categories.includes(w.category))
    : words;
  const todays = picked.slice(0, profile.goal);
  const done = todays.filter((w) => saved.includes(w.id) || liked.includes(w.id)).length;

  if (!ready || loading || todays.length === 0) {
    return (
      <Screen title={profile.name ? `Ahoj, ${profile.name}` : "Dnešné slová"}>
        {todays.length === 0 && ready && !loading ? (
          <EmptyState
            symbol="▦"
            title="Zatiaľ žiadne slová"
            text="Vyber si aspoň jednu kategóriu a hneď ti pripravíme dnešný feed."
          >
            <Link to="/app/kategorie">
              <Button>Vybrať kategórie</Button>
            </Link>
          </EmptyState>
        ) : (
          <Skeleton className="h-[70svh]" />
        )}
      </Screen>
    );
  }

  return (
    <div className="feed-viewport fixed inset-x-0 top-0 snap-y snap-mandatory overflow-y-auto overscroll-contain">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 safe-top">
        <div className="mx-auto flex max-w-md justify-center px-5">
          <span className="rounded-full bg-card/85 px-3 py-1 text-xs text-muted-foreground shadow-soft backdrop-blur">
            {done} z {todays.length} dnešných slov
          </span>
        </div>
      </div>
      {todays.map((w) => (
        <section
          key={w.id}
          className="mx-auto flex h-full max-w-md snap-start snap-always flex-col px-4 pt-14 pb-4"
        >
          <WordCard word={w} className="flex-1 justify-center" />
        </section>
      ))}
      <section className="mx-auto flex h-full max-w-md snap-start flex-col items-center justify-center px-6 text-center">
        <span className="font-display text-5xl text-primary">✓</span>
        <h2 className="mt-4 text-2xl">To je na dnes všetko</h2>
        <p className="mt-2 text-muted-foreground">Zajtra ťa čakajú ďalšie slová.</p>
      </section>
    </div>
  );
}

