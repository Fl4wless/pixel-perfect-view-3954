import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categories, wordsInCategory } from "@/lib/words";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/kategorie/")({
  head: () => ({
    meta: [
      { title: "Kategórie — Slovko" },
      { name: "description", content: "Prehľad všetkých kategórií slov a tvoje preferencie." },
      { property: "og:title", content: "Kategórie — Slovko" },
      { property: "og:description", content: "Vyber si oblasti, z ktorých chceš objavovať slová." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const { profile, updateProfile } = useStore();
  const toggle = (slug: string) =>
    updateProfile({
      categories: profile.categories.includes(slug)
        ? profile.categories.filter((s) => s !== slug)
        : [...profile.categories, slug],
    });

  return (
    <Screen title="Kategórie" subtitle={`${profile.categories.length} zapnutých vo feede`}>
      <ul className="space-y-3">
        {categories.map((c) => {
          const on = profile.categories.includes(c.slug);
          return (
            <li key={c.slug} className="surface flex items-center gap-3 p-3 pl-4">
              <Link
                to="/app/kategorie/$slug"
                params={{ slug: c.slug }}
                className="tap flex flex-1 items-center gap-3"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl text-lg",
                    on ? "bg-primary-soft text-primary" : "bg-sand text-muted-foreground",
                  )}
                >
                  {c.symbol}
                </span>
                <span>
                  <span className="block font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {wordsInCategory(c.slug).length} slov
                  </span>
                </span>
              </Link>
              <button
                role="switch"
                aria-checked={on}
                aria-label={`${on ? "Vypnúť" : "Zapnúť"} ${c.name}`}
                onClick={() => toggle(c.slug)}
                className="tap flex items-center justify-center"
              >
                <span
                  className={cn(
                    "relative h-7 w-12 rounded-full transition-colors",
                    on ? "bg-primary" : "bg-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 h-5 w-5 rounded-full bg-card shadow-soft transition-all",
                      on ? "left-6" : "left-1",
                    )}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}
