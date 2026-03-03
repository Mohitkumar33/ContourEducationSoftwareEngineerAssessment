"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createConsultationAction(
  _prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim();
  const scheduledAtLocal = String(formData.get("scheduledAt") ?? "").trim();

  if (!firstName || !lastName || !reason || !scheduledAtLocal) {
    return { error: "All fields are required." };
  }

  const scheduled_at = new Date(scheduledAtLocal).toISOString();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("consultations").insert({
    user_id: user.id,
    first_name: firstName,
    last_name: lastName,
    reason,
    scheduled_at,
  });

  if (error) return { error: error.message };

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