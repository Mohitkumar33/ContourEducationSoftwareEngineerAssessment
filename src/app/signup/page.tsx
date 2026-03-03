"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/actions/auth";

const initialState = { error: null as string | null };

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState
  );

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <form action={formAction} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            required
            placeholder="First name"
            className="rounded border p-2"
          />
          <input
            name="lastName"
            required
            placeholder="Last name"
            className="rounded border p-2"
          />
        </div>

        <input
          name="phone"
          placeholder="Phone (optional)"
          className="w-full rounded border p-2"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded border p-2"
        />

        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Password"
          className="w-full rounded border p-2"
        />

        {state.error && (
          <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
            {state.error}
          </div>
        )}

        <button
          disabled={pending}
          className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {pending ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </main>
  );
}