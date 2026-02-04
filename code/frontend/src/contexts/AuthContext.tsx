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
import type { Profile } from "@backend/domain/entities/Profile";

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

/** Primeiro nome para exibir (ex: "Olá, Maria!"). Usa perfil, depois user_metadata, depois fallback. */
function getDisplayFirstName(user: User | null, profile: Profile | null): string {
  const fromProfile = profile?.fullName?.trim();
  const fromMeta = (user?.user_metadata?.full_name as string)?.trim();
  const full = fromProfile || fromMeta || "";
  const first = full.split(/\s+/)[0];
  if (first) return first;
  return profile?.profileType === "entrepreneur" ? "Empreendedor" : "Consumidor";
}

/** Nome completo para exibir. */
function getDisplayFullName(user: User | null, profile: Profile | null): string {
  const fromProfile = profile?.fullName?.trim();
  const fromMeta = (user?.user_metadata?.full_name as string)?.trim();
  return fromProfile || fromMeta || (profile?.profileType === "entrepreneur" ? "Empreendedor" : "Consumidor");
}

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  /** Primeiro nome para "Olá, [nome]!" */
  displayFirstName: string;
  /** Nome completo para cabeçalhos de perfil */
  displayFullName: string;
  signIn: (email: string, password: string) => Promise<{
    error?: string;
    profile?: Profile | null;
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
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const authRepo = supabase ? new AuthRepository(supabase) : null;
const authUseCase = authRepo ? new AuthUseCase(authRepo) : null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!authUseCase) return;
    const p = await authUseCase.getCurrentProfile();
    setProfile(p);
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u ?? null);
      if (u && authUseCase) {
        authUseCase.getCurrentProfile().then(setProfile).catch(() => setProfile(null));
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user && authUseCase) {
          authUseCase.getCurrentProfile().then(setProfile).catch(() => setProfile(null));
        } else {
          setProfile(null);
        }
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
