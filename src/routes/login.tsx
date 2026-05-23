import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — AI Content Studio" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Your AI team is waiting."
      footer={<>New here? <Link to="/signup" className="text-cyan-glow hover:underline">Create account</Link></>}
    >
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="you@studio.com" />
        <Field label="Password" type="password" placeholder="••••••••" />
        <Link to="/app">
          <button className="mt-2 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground glow-primary hover:opacity-90 transition">
            Enter the studio
          </button>
        </Link>
      </form>
    </AuthShell>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...props} className="mt-1 w-full glass rounded-xl bg-transparent px-3 py-2.5 text-sm outline-none focus:glow-primary transition" />
    </label>
  );
}
