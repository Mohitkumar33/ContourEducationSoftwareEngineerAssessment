"use client";

import { useActionState } from "react";
import { createConsultationAction } from "@/app/actions/consultations";

const initialState = { error: null as string | null };

export default function NewConsultationForm({
  defaultFirstName,
  defaultLastName,
}: {
  defaultFirstName: string;
  defaultLastName: string;
}) {
  const [state, formAction, pending] = useActionState(createConsultationAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">First name</label>
          <input name="firstName" required defaultValue={defaultFirstName} className="mt-1 w-full rounded border p-2" />
        </div>
        <div>
          <label className="text-sm font-medium">Last name</label>
          <input name="lastName" required defaultValue={defaultLastName} className="mt-1 w-full rounded border p-2" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Reason</label>
        <textarea name="reason" required rows={4} className="mt-1 w-full rounded border p-2" />
      </div>

      <div>
        <label className="text-sm font-medium">Date & time</label>
        <input name="scheduledAt" type="datetime-local" required className="mt-1 w-full rounded border p-2" />
      </div>

      {state.error && (
        <div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <button disabled={pending} className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60">
        {pending ? "Creating..." : "Create consultation"}
      </button>

      <a className="block text-center text-sm underline" href="/dashboard">
        Back to dashboard
      </a>
    </form>
  );
}