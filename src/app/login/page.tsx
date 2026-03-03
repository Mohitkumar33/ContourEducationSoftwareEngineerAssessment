"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/actions/auth";

const initialState = { error: null as string | null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Log in</h1>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded border p-2" />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input name="password" type="password" required className="mt-1 w-full rounded border p-2" />
        </div>

        {state.error && (
          <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {pending ? "Logging in..." : "Log in"}
        </button>

        <p className="text-sm text-gray-600">
          New here? <a className="underline" href="/signup">Create an account</a>
        </p>
      </form>
    </main>
  );
}