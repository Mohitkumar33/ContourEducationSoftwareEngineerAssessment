import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth";
import ToggleCompleteButton from "./toggle-complete-button";

type ConsultationRow = {
  id: string;
  first_name: string;
  last_name: string;
  reason: string;
  scheduled_at: string;
  is_complete: boolean;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name,last_name")
    .single();

  const { data: consultations, error } = await supabase
    .from("consultations")
    .select(
      "id,first_name,last_name,reason,scheduled_at,is_complete,created_at"
    )
    .order("scheduled_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Welcome{profile?.first_name ? `, ${profile.first_name}` : ""}.
            Signed in as {user.email}
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href="/consultations/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Book consultation
          </a>
          <form action={signOutAction}>
            <button className="rounded border px-4 py-2">Logout</button>
          </form>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Your consultations</h2>

        {!consultations || consultations.length === 0 ? (
          <div className="mt-3 rounded border p-4 text-sm text-gray-700">
            No consultations yet. Click <b>Book consultation</b> to create one.
          </div>
        ) : (
          <div className="mt-3 overflow-hidden rounded border">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">When</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((c: ConsultationRow) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">
                      {new Intl.DateTimeFormat("en-AU", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(c.scheduled_at))}
                    </td>
                    <td className="p-3">
                      {c.first_name} {c.last_name}
                    </td>
                    <td className="p-3">{c.reason}</td>
                    <td className="p-3">
                      <span
                        className={
                          "rounded px-2 py-1 text-xs " +
                          (c.is_complete
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800")
                        }
                      >
                        {c.is_complete ? "Complete" : "Incomplete"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <ToggleCompleteButton
                        id={c.id}
                        isComplete={c.is_complete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
