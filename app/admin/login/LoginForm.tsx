"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No fue posible iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Correo</label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-mida-primary focus:ring-2 focus:ring-blue-100"
          placeholder="usuario@mida.mx" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Contraseña</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-mida-primary focus:ring-2 focus:ring-blue-100"
          placeholder="Tu contraseña" />
      </div>
      {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full rounded-xl bg-mida-primary px-5 py-3 font-bold text-white transition hover:bg-mida-deep disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
