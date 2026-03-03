export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-semibold">Mini LMS</h1>
      <p className="mt-3 max-w-xl text-gray-600">
        Book consultations, track completion, and manage your learning support.
      </p>

      <div className="mt-8 flex gap-3">
        <a href="/login" className="rounded bg-black px-5 py-2 text-white">
          Log in
        </a>
        <a href="/signup" className="rounded border px-5 py-2">
          Sign up
        </a>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Built with Next.js + Supabase (Auth + Postgres + RLS).
      </p>
    </main>
  );
}
