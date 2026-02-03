import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthRepository } from "@backend/data/repositories/AuthRepository";
import { AuthUseCase } from "@backend/domain/usecases/AuthUseCase";
import type { Profile } from "@backend/domain/entities/Profile";

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string; profile?: Profile | null }>;
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

const authRepo = new AuthRepository(supabase);
const authUseCase = new AuthUseCase(authRepo);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    const p = await authUseCase.getCurrentProfile();
    setProfile(p);
  };

  useEffect(() => {
    authUseCase.getCurrentUser().then((u) => {
      setUser(u ?? null);
      if (u) {
        authUseCase.getCurrentProfile().then(setProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const p = await authUseCase.getCurrentProfile();
          setProfile(p);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await authUseCase.signIn({ email, password });
      const p = await authUseCase.getCurrentProfile();
      setUser(await authUseCase.getCurrentUser() ?? null);
      setProfile(p);
      return { profile: p };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao entrar";
      return { error: message };
    }
  };

  const signUp = async (data: {
    email: string;
    password: string;
    fullName: string;
    profileType: "consumer" | "entrepreneur";
    phone?: string;
  }) => {
    try {
      await authUseCase.signUp(data);
      return {};
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Erro ao cadastrar";
      return { error: message };
    }
  };

  const signOut = async () => {
    await authUseCase.signOut();
    setUser(null);
    setProfile(null);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
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
