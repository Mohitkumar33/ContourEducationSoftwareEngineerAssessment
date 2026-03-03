"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUpAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;

  // 1️⃣ Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error("User creation failed");
  }

  // 2️⃣ Insert into profiles table
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
    });

  if (profileError) {
    throw new Error(profileError.message);
  }

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