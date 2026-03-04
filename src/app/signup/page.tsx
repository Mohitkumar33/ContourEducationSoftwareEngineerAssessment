"use client";

import { useActionState, useRef } from "react";
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

      <form
        action={formAction}
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          const form = e.currentTarget;
          const password =
            (form.elements.namedItem("password") as HTMLInputElement)?.value ??
            "";
          const confirm =
            (form.elements.namedItem("confirmPassword") as HTMLInputElement)
              ?.value ?? "";

          if (password !== confirm) {
            e.preventDefault();
            // Show a native browser error bubble (simple + clean)
            const confirmEl = form.elements.namedItem(
              "confirmPassword"
            ) as HTMLInputElement;
            confirmEl.setCustomValidity("Passwords do not match.");
            confirmEl.reportValidity();
          } else {
            // Clear error if previously set
            const confirmEl = form.elements.namedItem(
              "confirmPassword"
            ) as HTMLInputElement;
            confirmEl.setCustomValidity("");
          }
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            required
            placeholder="First name"
            className="rounded border p-2"
            autoComplete="given-name"
          />
          <input
            name="lastName"
            required
            placeholder="Last name"
            className="rounded border p-2"
            autoComplete="family-name"
          />
        </div>

        <input
          name="phone"
          placeholder="Phone (optional)"
          className="w-full rounded border p-2"
          autoComplete="tel"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded border p-2"
          autoComplete="email"
        />

        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Password"
          className="w-full rounded border p-2"
          autoComplete="new-password"
        />

        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          placeholder="Confirm password"
          className="w-full rounded border p-2"
          autoComplete="new-password"
          onInput={(e) => {
            // Clear the custom validity message as user types
            (e.currentTarget as HTMLInputElement).setCustomValidity("");
          }}
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

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-black">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
