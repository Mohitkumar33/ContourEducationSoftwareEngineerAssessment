"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUpAction(
  _prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const phone = phoneRaw.length ? phoneRaw : null;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  const user = data.user;
  if (!user) return { error: "User creation failed." };

  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    first_name: firstName,
    last_name: lastName,
    phone,
  });

  if (profileError) return { error: profileError.message };

  redirect("/dashboard");
}

export async function signInAction(
  _prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}