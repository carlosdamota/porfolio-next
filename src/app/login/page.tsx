import { Button } from "@/components/atoms/Button";
import { login } from "@/actions/auth";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl border border-border shadow-xl">
        <h1 className="text-3xl font-bold text-center text-primary">Admin Login</h1>
        
        <form className="space-y-4" action={login}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
