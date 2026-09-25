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

  return (
    <Screen
      title={profile.name ? `Ahoj, ${profile.name}` : "Dnešné slová"}
      subtitle={`${done} z ${todays.length} dnešných slov`}
    >
      {!ready || loading ? (
        <div className="space-y-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : todays.length === 0 ? (
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
        <div className="space-y-5">
          {todays.map((w) => (
            <WordCard key={w.id} word={w} />
          ))}
          <p className="py-6 text-center text-sm text-muted-foreground">
            To je na dnes všetko. Zajtra pridáme ďalšie.
          </p>
        </div>
      )}
    </Screen>
  );
}
