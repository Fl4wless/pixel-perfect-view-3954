import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slovko — jedno nové slovo denne" },
      {
        name: "description",
        content:
          "Objavuj nové slová v pokojnom tempe. Definícia, výslovnosť, príklad vo vete a vlastný zoznam obľúbených slov.",
      },
      { property: "og:title", content: "Slovko — jedno nové slovo denne" },
      {
        property: "og:description",
        content: "Objavuj nové slová v pokojnom tempe, bez tlaku a bez notifikačného chaosu.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <main className="flex min-h-svh flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6">
        <div className="safe-top flex flex-1 flex-col justify-center py-10">
          <div className="animate-rise relative mb-10 flex h-56 items-center justify-center">
            <div className="absolute h-48 w-48 rounded-full bg-primary-soft blur-[2px]" />
            <div className="absolute h-36 w-52 -rotate-6 rounded-[3rem] bg-sand" />
            <span className="font-display relative text-6xl font-semibold text-primary">Aa</span>
          </div>

          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">
            Slovná zásoba v pokoji
          </p>
          <h1 className="mt-3 text-[2.75rem] leading-[1.05]">
            Slovko
            <span className="block text-muted-foreground">jedno slovo, každý deň</span>
          </h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted-foreground">
            Krátke definície, skutočné vety a slová, ktoré si naozaj zapamätáš. Bez sérií, bez
            tlaku.
          </p>
        </div>

        <div className="safe-bottom space-y-3 pb-6">
          <Link
            to="/registracia"
            className="tap flex w-full items-center justify-center rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-soft transition-all active:scale-[0.98]"
          >
            Začať
          </Link>
          <Link
            to="/prihlasenie"
            className="tap flex w-full items-center justify-center rounded-full px-6 font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            Už mám účet
          </Link>
        </div>
      </div>
    </main>
  );
}
