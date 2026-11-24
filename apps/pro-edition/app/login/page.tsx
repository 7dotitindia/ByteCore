import { signIn } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next = "/admin" } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="font-serif text-2xl text-text">ByteScope Pro</h1>
      <p className="mt-1 text-sm text-text-secondary">Sign in to the admin dashboard.</p>

      {error && (
        <p className="mt-4 border border-accent/40 bg-accent/5 px-3 py-2 text-sm text-accent">{error}</p>
      )}

      <form action={signIn} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue="admin@bytescope.test"
            className="w-full border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-xs text-text-secondary">
        Local dev seed login: <code>admin@bytescope.test</code> / <code>bytescope-admin</code> —
        see <code>supabase/seed.sql</code>. Never seed a known password into a production project.
      </p>
    </main>
  );
}
