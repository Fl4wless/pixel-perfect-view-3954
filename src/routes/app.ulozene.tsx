import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, EmptyState, Screen, Tag } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categories, categoryBySlug, wordById } from "@/lib/words";

export const Route = createFileRoute("/app/ulozene")({
  head: () => ({
    meta: [
      { title: "Uložené slová — Slovko" },
      { name: "description", content: "Tvoj osobný zoznam uložených slov." },
      { property: "og:title", content: "Uložené slová — Slovko" },
      { property: "og:description", content: "Vyhľadávaj a triedi svoje uložené slová." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved, toggleSave, moveSaved } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const list = saved
    .map((id) => wordById(id))
    .filter((w): w is NonNullable<typeof w> => !!w)
    .filter((w) => (!cat || w.category === cat) && w.word.toLowerCase().includes(q.toLowerCase()));
  const usedCats = categories.filter((c) => saved.some((id) => wordById(id)?.category === c.slug));

  return (
    <Screen title="Uložené" subtitle={`${saved.length} slov`}>
      {saved.length === 0 ? (
        <EmptyState
          symbol="❧"
          title="Zatiaľ nič uložené"
          text="Pri slove, ktoré si chceš zapamätať, ťukni na „Uložiť“. Nájdeš ho potom tu."
        >
          <Link to="/app">
            <Button>Prejsť na dnešné slová</Button>
          </Link>
        </EmptyState>
      ) : (
        <>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Hľadať slovo…"
            aria-label="Hľadať"
            className="tap w-full rounded-full border border-border bg-card px-5 outline-none focus:border-primary"
          />
          <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
            <Tag active={!cat} onClick={() => setCat(null)}>
              Všetky
            </Tag>
            {usedCats.map((c) => (
              <Tag key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                {c.name}
              </Tag>
            ))}
          </div>
          <ul className="mt-5 space-y-3">
            {list.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">Nič sme nenašli.</p>
            )}
            {list.map((w) => (
              <li key={w.id} className="surface flex items-center gap-2 p-4">
                <Link to="/app/slovo/$id" params={{ id: w.id }} className="min-w-0 flex-1">
                  <span className="font-display text-xl font-semibold">{w.word}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {categoryBySlug(w.category)?.name}
                  </span>
                  <p className="truncate text-sm text-muted-foreground">{w.definition}</p>
                </Link>
                <div className="flex flex-col">
                  <button aria-label="Posunúť vyššie" onClick={() => moveSaved(w.id, -1)} className="tap text-muted-foreground">↑</button>
                  <button aria-label="Posunúť nižšie" onClick={() => moveSaved(w.id, 1)} className="tap text-muted-foreground">↓</button>
                </div>
                <button
                  aria-label="Odstrániť z uložených"
                  onClick={() => toggleSave(w.id)}
                  className="tap rounded-full text-primary"
                >
                  ✓
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Screen>
  );
}
