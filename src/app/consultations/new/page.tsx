import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NewConsultationForm from "./ui";

export default async function NewConsultationPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name,last_name")
    .single();

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Book a consultation</h1>
      <p className="mt-2 text-sm text-gray-600">Fill in the details below.</p>

      <NewConsultationForm
        defaultFirstName={profile?.first_name ?? ""}
        defaultLastName={profile?.last_name ?? ""}
      />
    </main>
  );
}
