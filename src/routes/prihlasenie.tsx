import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field } from "@/components/ui-kit";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/prihlasenie")({
  head: () => ({
    meta: [
      { title: "Prihlásenie — Slovko" },
      { name: "description", content: "Prihlás sa do Slovka a pokračuj v objavovaní slov." },
      { property: "og:title", content: "Prihlásenie — Slovko" },
      { property: "og:description", content: "Prihlás sa a pokračuj tam, kde si skončil." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const { signIn, profile } = useStore();
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);

  function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Zadaj platnú e-mailovú adresu.");
    if (mode === "reset") {
      setError(undefined);
      setSent(true);
      return;
    }
    if (password.length < 6) return setError("Heslo musí mať aspoň 6 znakov.");
    setError(undefined);
    signIn(email);
    navigate({ to: profile.categories.length ? "/app" : "/onboarding" });
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col px-6">
      <div className="safe-top">
        <Link to="/" className="tap inline-flex items-center text-sm text-muted-foreground">
          ← Späť
        </Link>
      </div>

      <div className="flex-1 pt-8">
        <h1 className="text-[2rem] leading-tight">
          {mode === "login" ? "Vitaj späť" : "Obnovenie hesla"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {mode === "login"
            ? "Pokračuj tam, kde si prestal."
            : "Pošleme ti odkaz na nastavenie nového hesla."}
        </p>

        {sent ? (
          <div className="surface mt-8 p-5">
            <p className="text-sm">
              <span aria-hidden>✓ </span>Odkaz sme poslali na <strong>{email}</strong>. Skontroluj
              si e-mail.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <Field
              label="E-mail"
              type="email"
              inputMode="email"
              placeholder="meno@email.sk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && error.includes("e-mail") ? error : undefined}
            />
            {mode === "login" && (
              <Field
                label="Heslo"
                type="password"
                placeholder="Tvoje heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && error.includes("Heslo") ? error : undefined}
              />
            )}
          </div>
        )}

        <button
          onClick={() => {
            setMode(mode === "login" ? "reset" : "login");
            setSent(false);
            setError(undefined);
          }}
          className="tap mt-4 text-sm font-medium text-primary"
        >
          {mode === "login" ? "Zabudol som heslo" : "Späť na prihlásenie"}
        </button>

        {mode === "login" && (
          <>
            <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> alebo{" "}
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signIn("apple@icloud.com");
                  navigate({ to: "/onboarding" });
                }}
              >
                Pokračovať cez Apple
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  signIn("google@gmail.com");
                  navigate({ to: "/onboarding" });
                }}
              >
                Pokračovať cez Google
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="safe-bottom pt-8 pb-6">
        <Button className="w-full" onClick={submit}>
          {mode === "login" ? "Prihlásiť sa" : "Poslať odkaz"}
        </Button>
      </div>
    </main>
  );
}
