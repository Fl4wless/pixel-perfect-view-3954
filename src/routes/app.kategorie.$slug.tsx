import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Screen } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categoryBySlug, wordsInCategory } from "@/lib/words";

export const Route = createFileRoute("/app/kategorie/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Slovko` },
          { name: "description", content: `Slová z kategórie ${loaderData.category.name}.` },
          { property: "og:title", content: `${loaderData.category.name} — Slovko` },
          { property: "og:description", content: `Slová z kategórie ${loaderData.category.name}.` },
        ]
      : [{ title: "Kategória nenájdená" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <Screen title="Kategória neexistuje">{null}</Screen>,
  component: CategoryDetail,
});

function CategoryDetail() {
  const { category } = Route.useLoaderData();
  const { saved } = useStore();
  const list = wordsInCategory(category.slug);
  return (
    <Screen
      title={`${category.symbol} ${category.name}`}
      subtitle={`${list.length} slov`}
      action={
        <Link to="/app/kategorie" className="tap flex items-center text-sm text-muted-foreground">
          ← Späť
        </Link>
      }
    >
      <ul className="space-y-3">
        {list.map((w) => (
          <li key={w.id}>
            <Link to="/app/slovo/$id" params={{ id: w.id }} className="surface block p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl font-semibold">{w.word}</span>
                {saved.includes(w.id) && <span className="text-xs text-primary">✓ uložené</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{w.definition}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Screen>
  );
}
