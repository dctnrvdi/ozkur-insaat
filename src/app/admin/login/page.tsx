"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "./actions";

function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  return (
    <div className="w-full max-w-sm bg-background border border-border rounded-lg p-8">
      <h1 className="font-display font-bold text-2xl mb-1">Özkur İnşaat</h1>
      <p className="text-sm text-muted mb-8">Yönetim paneline giriş yap</p>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-pill bg-foreground text-background px-6 py-3 text-sm font-semibold disabled:opacity-50"
        >
          {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
