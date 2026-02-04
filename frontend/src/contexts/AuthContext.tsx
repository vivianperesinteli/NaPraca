import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { AuthRepository } from "@backend/data/repositories/AuthRepository";
import { AuthUseCase } from "@backend/domain/usecases/AuthUseCase";
import type { ProfileModel } from "@backend/data/models/ProfileModel";

const CONFIG_ERROR =
  "Configure o Supabase: crie o arquivo .env na pasta frontend com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (copie do .env.example).";

/** Extrai mensagem de erro do Supabase ou de Error sem acessar propriedades que possam causar ReferenceError */
function getErrorMessage(e: unknown): string {
  if (e == null) return "Erro desconhecido";
  if (typeof e === "string") return e;
  if (e instanceof Error) return e.message;
  const o = e as Record<string, unknown>;
  const msg = typeof o.message === "string" ? o.message : null;
  const code = typeof o.code === "string" ? o.code : null;
  if (code === "user_already_exists" || (msg && msg.toLowerCase().includes("already registered"))) {
    return "Este e-mail já está cadastrado. Use a tela de login ou recupere a senha.";
  }
  if (msg && (msg.toLowerCase().includes("abort") || msg.toLowerCase().includes("signal is aborted"))) {
    return "Conexão interrompida. Tente novamente.";
  }
  if (msg) return msg;
  return "Erro ao processar. Tente novamente.";
}

/** Primeiro nome para exibir (ex: "Olá, Maria!"). Perfil → user_metadata → e-mail → fallback por tipo. */
function getDisplayFirstName(user: User | null, profile: ProfileModel | null): string {
  const fromProfile = profile?.full_name?.trim();
  const fromMeta = (user?.user_metadata?.full_name as string)?.trim();
  const full = fromProfile || fromMeta || "";
  const first = full.split(/\s+/)[0];
  if (first) return first;
  const fromEmail = (user?.email ?? "").split("@")[0].trim();
  if (fromEmail) return fromEmail;
  return profile?.profile_type === "entrepreneur" ? "Empreendedor" : "Consumidor";
}

/** Nome completo para exibir. Perfil → user_metadata → e-mail → fallback por tipo. */
function getDisplayFullName(user: User | null, profile: ProfileModel | null): string {
  const fromProfile = profile?.full_name?.trim();
  const fromMeta = (user?.user_metadata?.full_name as string)?.trim();
  if (fromProfile || fromMeta) return fromProfile || fromMeta || "";
  const fromEmail = (user?.email ?? "").split("@")[0].trim();
  if (fromEmail) return fromEmail;
  return profile?.profile_type === "entrepreneur" ? "Empreendedor" : "Consumidor";
}

type AuthContextValue = {
  user: User | null;
  profile: ProfileModel | null;
  loading: boolean;
  isConfigured: boolean;
  /** Primeiro nome para "Olá, [nome]!" */
  displayFirstName: string;
  /** Nome completo para cabeçalhos de perfil */
  displayFullName: string;
  signIn: (email: string, password: string) => Promise<{
    error?: string;
    profile?: ProfileModel | null;
    profileType?: "consumer" | "entrepreneur";
  }>;
  signUp: (data: {
    email: string;
    password: string;
    fullName: string;
    profileType: "consumer" | "entrepreneur";
    phone?: string;
  }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<{ success: boolean; error?: string }>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const authRepo = supabase ? new AuthRepository(supabase) : null;
const authUseCase = authRepo ? new AuthUseCase(authRepo) : null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileModel | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (): Promise<{ success: boolean; error?: string }> => {
    if (!authUseCase) return { success: false, error: "Conexão não configurada." };
    try {
      // Apenas buscar o profile, nunca criar automaticamente
      const p = await authUseCase.getCurrentProfile();
      setProfile(p);
      return { success: true };
    } catch (e) {
      // Se o profile não existe, retornar erro
      // Não tentar criar automaticamente para evitar erro 409
      const msg = e instanceof Error ? e.message : String(e);
      setProfile(null);
      return { success: false, error: msg };
    }
  };

  const loadProfile = async (): Promise<void> => {
    if (!authUseCase) return;
    try {
      // Apenas buscar o profile, nunca criar automaticamente
      // O profile deve ser criado pelo trigger do Supabase no signUp
      const p = await authUseCase.getCurrentProfile();
      setProfile(p);
    } catch (error) {
      // Se o profile não existe, definir como null
      // Não tentar criar automaticamente para evitar erro 409
      console.warn("Profile não encontrado. O profile deve ser criado pelo trigger do Supabase no signUp.", error);
      setProfile(null);
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ?? null);
      if (u) loadProfile();
      else setProfile(null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) loadProfile();
        else setProfile(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: CONFIG_ERROR };
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: getErrorMessage(error) };
      }
      const user = data?.user ?? null;
      setUser(user);
      setProfile(null);
      const profileType = (user?.user_metadata?.profile_type as "consumer" | "entrepreneur" | undefined) ?? "consumer";
      if (authUseCase) {
        authUseCase.getCurrentProfile().then((p) => setProfile(p)).catch(() => {});
      }
      return { profile: null, profileType };
    } catch (e: unknown) {
      return { error: getErrorMessage(e) };
    }
  };

  const signUp = async (data: {
    email: string;
    password: string;
    fullName: string;
    profileType: "consumer" | "entrepreneur";
    phone?: string;
  }) => {
    if (!supabase) {
      return { error: CONFIG_ERROR };
    }
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            profile_type: data.profileType,
            phone: data.phone,
          },
        },
      });
      if (error) return { error: getErrorMessage(error) };
      return {};
    } catch (e: unknown) {
      return { error: getErrorMessage(e) };
    }
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      displayFirstName: getDisplayFirstName(user, profile),
      displayFullName: getDisplayFullName(user, profile),
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
