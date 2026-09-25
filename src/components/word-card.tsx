import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { categoryBySlug, type Word } from "@/lib/words";
import { speak, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SpeakButton({ word, label }: { word: string; label?: string }) {
  return (
    <button
      onClick={() => speak(word)}
      aria-label={`Prehrať výslovnosť slova ${word}`}
      className="tap inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      <span aria-hidden>♪</span>
      {label ?? "Vypočuť"}
    </button>
  );
}

export function HighlightedExample({ sentence, word }: { sentence: string; word: string }) {
  const base = word.split(" ")[0];
  const parts = sentence.split(new RegExp(`(${base}\\w*)`, "gi"));
  return (
    <p className="text-[1.05rem] leading-relaxed text-foreground/85">
      {parts.map((part, i) =>
        part.toLowerCase().startsWith(base.toLowerCase()) ? (
          <mark
            key={i}
            className="rounded-md bg-primary-soft px-1 py-0.5 font-medium text-secondary-foreground"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

export function ActionButton({
  active,
  onClick,
  icon,
  activeIcon,
  label,
  activeLabel,
  tone = "primary",
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  activeIcon: string;
  label: string;
  activeLabel: string;
  tone?: "primary" | "accent";
}) {
  const [bump, setBump] = useState(false);
  return (
    <button
      onClick={() => {
        setBump(true);
        setTimeout(() => setBump(false), 340);
        onClick();
      }}
      aria-pressed={active}
      className={cn(
        "tap flex flex-1 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
        active
          ? tone === "accent"
            ? "border-accent bg-accent/10 text-accent"
            : "border-primary bg-primary-soft text-secondary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40",
      )}
    >
      <span aria-hidden className={cn("text-base", bump && "animate-pop inline-block")}>
        {active ? activeIcon : icon}
      </span>
      {active ? activeLabel : label}
    </button>
  );
}

export function WordCard({ word }: { word: Word }) {
  const { liked, saved, toggleLike, toggleSave } = useStore();
  const category = categoryBySlug(word.category);

  return (
    <article className="surface animate-rise flex flex-col gap-5 p-6">
      <Link
        to="/app/kategorie/$slug"
        params={{ slug: word.category }}
        className="tap inline-flex w-fit items-center gap-2 self-start rounded-full bg-sand px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase"
      >
        <span aria-hidden>{category?.symbol}</span>
        {category?.name}
      </Link>

      <div>
        <Link to="/app/slovo/$id" params={{ id: word.id }}>
          <h2 className="font-display text-[2.6rem] leading-[1.05] font-semibold">{word.word}</h2>
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">{word.phonetic}</span>
          <SpeakButton word={word.word} />
        </div>
      </div>

      <div className="space-y-3">
        <span className="inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {word.partOfSpeech}
        </span>
        <p className="text-[1.05rem] leading-relaxed">{word.definition}</p>
        <div className="border-l-2 border-primary/30 pl-4">
          <HighlightedExample sentence={word.examples[0]} word={word.word} />
        </div>
      </div>

      <div className="flex gap-3">
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
          activeLabel="Uložené"
        />
      </div>
    </article>
  );
}
