import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Tag } from "@/components/ui-kit";
import { useStore } from "@/lib/store";
import { categories, wordsInCategory } from "@/lib/words";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Nastavenie profilu — Slovko" },
      {
        name: "description",
        content: "Tri krátke kroky: meno, úroveň a kategórie, ktoré ťa zaujímajú.",
      },
      { property: "og:title", content: "Nastavenie profilu — Slovko" },
      { property: "og:description", content: "Tri krátke kroky k tvojmu dennému feedu slov." },
    ],
  }),
  component: Onboarding,
});

const languages = ["Angličtina", "Nemčina", "Španielčina", "Francúzština"];
const levels = ["Začiatočník", "Mierne pokročilá", "Pokročilý", "Skoro ako doma"];
const goals = [5, 10, 15];

function Onboarding() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile.name);
  const [language, setLanguage] = useState(profile.language);
  const [level, setLevel] = useState(profile.level);
  const [goal, setGoal] = useState(profile.goal);
  const [picked, setPicked] = useState<string[]>(profile.categories);
  const [nameError, setNameError] = useState<string>();

  function next() {
    if (step === 1) {
      if (name.trim().length < 2) return setNameError("Napíš aspoň dva znaky.");
      setNameError(undefined);
      updateProfile({ name: name.trim(), language, level, goal });
      setStep(2);
      return;
    }
    if (step === 2) {
      updateProfile({ categories: picked });
      setStep(3);
      return;
    }
    navigate({ to: "/app" });
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col px-6">
      <header className="safe-top pb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{step} z 3</span>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="tap text-sm">
              ← Späť
            </button>
          )}
        </div>
        <div className="mt-3 flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-primary" : "bg-secondary",
              )}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 pb-6">
        {step === 1 && (
          <div className="animate-rise space-y-7">
            <div>
              <h1 className="text-[1.9rem] leading-tight">Ako ti máme hovoriť?</h1>
              <p className="mt-2 text-muted-foreground">Toto uvidíš len ty.</p>
            </div>
            <Field
              label="Meno alebo prezývka"
              placeholder="Napr. Daniel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
            />
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Chcem sa učiť</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <Tag key={l} active={language === l} onClick={() => setLanguage(l)}>
                    {l}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Moja úroveň</p>
              <div className="flex flex-wrap gap-2">
                {levels.map((l) => (
                  <Tag key={l} active={level === l} onClick={() => setLevel(l)}>
                    {l}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Denný cieľ</p>
              <div className="flex gap-2">
                {goals.map((g) => (
                  <Tag key={g} active={goal === g} onClick={() => setGoal(g)}>
                    {g} slov denne
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-rise space-y-5">
            <div>
              <h1 className="text-[1.9rem] leading-tight">Čo ťa zaujíma?</h1>
              <p className="mt-2 text-muted-foreground">
                Vyber si aspoň jednu oblasť. Zmeniť to môžeš kedykoľvek.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((c) => {
                const active = picked.includes(c.slug);
                return (
                  <button
                    key={c.slug}
                    aria-pressed={active}
                    onClick={() =>
                      setPicked(
                        active ? picked.filter((s) => s !== c.slug) : [...picked, c.slug],
                      )
                    }
                    className={cn(
                      "tap flex flex-col items-start gap-1 rounded-3xl border p-4 text-left transition-all duration-200 active:scale-[0.98]",
                      active
                        ? "border-primary bg-primary-soft shadow-soft"
                        : "border-border bg-card hover:border-primary/40",
                    )}
                  >
                    <span className="text-xl" aria-hidden>
                      {c.symbol}
                    </span>
                    <span className="text-sm leading-snug font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {active ? "✓ vybrané" : `${wordsInCategory(c.slug).length} slov`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-rise flex h-full flex-col justify-center text-center">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary-soft">
              <span className="font-display text-4xl text-primary">✓</span>
            </div>
            <h1 className="text-[1.9rem] leading-tight">Všetko je pripravené, {name || "vitaj"}</h1>
            <p className="mt-3 text-muted-foreground">
              Každý deň ti pripravíme {goal} slov z {picked.length || "tvojich"}{" "}
              {picked.length === 1 ? "kategórie" : "kategórií"}. Scrolluj v pokoji.
            </p>
          </div>
        )}
      </div>

      <div className="safe-bottom pb-6">
        <Button className="w-full" onClick={next} disabled={step === 2 && picked.length === 0}>
          {step === 3 ? "Poďme na to" : "Pokračovať"}
        </Button>
      </div>
    </main>
  );
}
