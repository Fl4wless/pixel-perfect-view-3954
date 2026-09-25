import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field } from "@/components/ui-kit";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/registracia")({
  head: () => ({
    meta: [
      { title: "Registrácia — Slovko" },
      { name: "description", content: "Vytvor si účet a začni objavovať nové slová každý deň." },
      { property: "og:title", content: "Registrácia — Slovko" },
      { property: "og:description", content: "Vytvor si účet v Slovku za pár sekúnd." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const { signIn } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function submit() {
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Zadaj platnú e-mailovú adresu.";
    if (password.length < 6) next.password = "Heslo musí mať aspoň 6 znakov.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      signIn(email);
      navigate({ to: "/onboarding" });
    }, 500);
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col px-6">
      <div className="safe-top">
        <Link to="/" className="tap inline-flex items-center text-sm text-muted-foreground">
          ← Späť
        </Link>
      </div>

      <div className="flex-1 pt-8">
        <h1 className="text-[2rem] leading-tight">Vitaj v Slovku</h1>
        <p className="mt-2 text-muted-foreground">Stačí e-mail a heslo. Nič viac.</p>

        <div className="mt-8 space-y-4">
          <Field
            label="E-mail"
            type="email"
            inputMode="email"
            placeholder="meno@email.sk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Field
            label="Heslo"
            type="password"
            placeholder="Aspoň 6 znakov"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> alebo <span className="h-px flex-1 bg-border" />
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
      </div>

      <div className="safe-bottom space-y-3 pt-8 pb-6">
        <Button className="w-full" onClick={submit} disabled={loading}>
          {loading ? "Vytváram účet…" : "Vytvoriť účet"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Už máš účet?{" "}
          <Link to="/prihlasenie" className="font-medium text-primary">
            Prihlás sa
          </Link>
        </p>
      </div>
    </main>
  );
}
