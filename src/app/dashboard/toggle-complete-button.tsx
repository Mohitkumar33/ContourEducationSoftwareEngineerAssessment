"use client";

import { useTransition } from "react";
import { toggleConsultationCompleteAction } from "@/app/actions/consultations";

export default function ToggleCompleteButton({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await toggleConsultationCompleteAction(id, !isComplete);
        })
      }
      className="rounded border px-3 py-2 disabled:opacity-60"
    >
      {pending ? "Saving..." : isComplete ? "Mark incomplete" : "Mark complete"}
    </button>
  );
}