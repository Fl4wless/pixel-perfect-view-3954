import { Link } from "@tanstack/react-router";

const items = [
  { to: "/app", label: "Domov", icon: "◉", exact: true },
  { to: "/app/kategorie", label: "Kategórie", icon: "▦", exact: false },
  { to: "/app/ulozene", label: "Uložené", icon: "❧", exact: false },
  { to: "/app/profil", label: "Profil", icon: "☺", exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Hlavná navigácia"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 pt-1.5 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {items.map((item) => (
          <li key={item.to} className="flex-1">
            <Link
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="tap flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1 text-[0.7rem] font-medium text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary bg-primary-soft/60" }}
            >
              <span aria-hidden className="text-lg leading-none">
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
