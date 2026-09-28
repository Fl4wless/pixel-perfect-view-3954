import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { ActionButton, HighlightedExample, SpeakButton } from "@/components/word-card";
import { Screen } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categoryBySlug, wordById } from "@/lib/words";

export const Route = createFileRoute("/app/slovo/$id")({
  loader: ({ params }) => {
    const word = wordById(params.id);
    if (!word) throw notFound();
    return { word };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.word.word} — Slovko` },
          { name: "description", content: loaderData.word.definition },
          { property: "og:title", content: `${loaderData.word.word} — Slovko` },
          { property: "og:description", content: loaderData.word.definition },
        ]
      : [{ title: "Slovo nenájdené" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <Screen title="Slovo sme nenašli">{null}</Screen>,
  component: WordDetail,
});

function WordDetail() {
  const { word } = Route.useLoaderData();
  const router = useRouter();
  const { liked, saved, toggleLike, toggleSave } = useStore();
  const cat = categoryBySlug(word.category);

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-8">
      <div className="safe-top">
        <button
          onClick={() => router.history.back()}
          className="tap flex items-center text-sm text-muted-foreground"
        >
          ← Späť
        </button>
      </div>
      <div className="animate-rise space-y-7 pt-4">
        <div>
          <span className="text-xs tracking-wide text-muted-foreground uppercase">
            {cat?.symbol} {cat?.name} · {word.partOfSpeech}
          </span>
          <h1 className="font-display mt-3 text-[3rem] leading-none">{word.word}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-muted-foreground">{word.phonetic}</span>
            <SpeakButton word={word.word} />
          </div>
        </div>
        <p className="text-lg leading-relaxed">{word.definition}</p>
        <section>
          <h2 className="mb-3 text-lg">Príklady</h2>
          <div className="space-y-3">
            {word.examples.map((e) => (
              <div key={e} className="border-l-2 border-primary/30 pl-4">
                <HighlightedExample sentence={e} word={word.word} />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-lg">Súvisiace slová</h2>
          <div className="flex flex-wrap gap-2">
            {word.synonyms.map((s) => (
              <span key={s} className="rounded-full bg-sand px-4 py-2 text-sm">
                {s}
              </span>
            ))}
          </div>
        </section>
        <div className="flex gap-3 pt-2">
          <ActionButton
            active={liked.includes(word.id)}
            onClick={() => toggleLike(word.id)}
            icon="♡"
            activeIcon="♥"
            label="Páči sa mi"
            activeLabel="Páči sa mi"
            tone="accent"
          />
          <ActionButton
            active={saved.includes(word.id)}
            onClick={() => toggleSave(word.id)}
            icon="⌂"
            activeIcon="✓"
            label="Uložiť"
            activeLabel="Odstrániť z uložených"
          />
        </div>
      </div>
    </div>
  );
}
