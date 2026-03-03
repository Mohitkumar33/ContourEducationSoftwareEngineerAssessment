import { signUpAction } from "@/app/actions/auth";

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-2 text-sm text-gray-600">
        Sign up to book and manage consultations.
      </p>

      <form action={signUpAction} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">First name</label>
            <input
              name="firstName"
              required
              className="mt-1 w-full rounded border p-2"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Last name</label>
            <input
              name="lastName"
              required
              className="mt-1 w-full rounded border p-2"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Phone (optional)</label>
          <input
            name="phone"
            className="mt-1 w-full rounded border p-2"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border p-2"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border p-2"
            autoComplete="new-password"
            minLength={8}
          />
          <p className="mt-1 text-xs text-gray-500">Min 8 characters.</p>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-black px-4 py-2 text-white"
        >
          Sign up
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}