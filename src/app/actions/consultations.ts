"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { consultationSchema } from "@/lib/validation/consultation";

type ActionState = { error: string | null };

export async function createConsultationAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createSupabaseServerClient();

  // Validate input (never trust client)
  const parsed = consultationSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    reason: formData.get("reason"),
    scheduledAt: formData.get("scheduledAt"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { firstName, lastName, reason, scheduledAt } = parsed.data;

  // Validate date
  const scheduledDate = new Date(scheduledAt);
  const scheduledTime = scheduledDate.getTime();

  if (Number.isNaN(scheduledTime)) {
    return { error: "Invalid date/time." };
  }

  // Nice touch: prevent booking in the past (using server time)
  if (scheduledTime < Date.now()) {
    return { error: "Please choose a future date/time." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error } = await supabase.from("consultations").insert({
    user_id: user.id,
    first_name: firstName,
    last_name: lastName,
    reason,
    scheduled_at: scheduledDate.toISOString(),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { error: null };
}

export async function toggleConsultationCompleteAction(id: string, nextValue: boolean) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("consultations")
    .update({ is_complete: nextValue })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { error: null };
}