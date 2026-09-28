import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Acceso al Blog | MIDA",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-mida-primary">MIDA</p>
          <h1 className="mt-2 text-3xl font-bold text-mida-deep">Administración del Blog</h1>
          <p className="mt-3 text-slate-600">Ingresa con tu cuenta autorizada de MIDA.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
