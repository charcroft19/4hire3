import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

type UniversityType = 'colorado.edu' | 'colostate.edu' | 'sdsu.edu';

interface AuthUser {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  bio?: string;
  university?: UniversityType;
}

type UserType = 'student' | 'employer' | null;

interface AuthContextType {
  user: AuthUser | null;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: any, type: UserType) => Promise<void>;
  updateUserProfile: (data: Partial<AuthUser>) => Promise<void>;
  isLoading: boolean;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Profile not found');
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser({
              id: session.user.id,
              email: profile.email,
              username: profile.username,
              avatar: profile.avatar,
              university: profile.university,
              bio: profile.bio,
            });
            setUserType(profile.type);

            // Only redirect if on auth pages
            const isAuthPage = location.pathname.includes('/signup/');
            if (isAuthPage) {
              navigate(profile.type === 'student' ? '/dashboard/student' : '/dashboard/employer');
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          if (profile) {
            setUser({
              id: session.user.id,
              email: profile.email,
              username: profile.username,
              avatar: profile.avatar,
              university: profile.university,
              bio: profile.bio,
            });
            setUserType(profile.type);
          }
        } else {
          setUser(null);
          setUserType(null);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string, type: UserType) => {
    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !authData.user) {
        throw signInError || new Error('Login failed');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error('Failed to fetch profile');
      }

      if (!profile) {
        throw new Error('Profile not found');
      }

      if (profile.type !== type) {
        await supabase.auth.signOut();
        throw new Error('Please use the correct login for your account type');
      }

      setUser({
        id: authData.user.id,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        university: profile.university,
        bio: profile.bio,
      });
      setUserType(profile.type);

      toast.success('Successfully logged in!');
      navigate(type === 'student' ? '/dashboard/student' : '/dashboard/employer');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signup = async (data: any, type: UserType) => {
    try {
      if (type === 'student') {
        const domain = data.email.split('@')[1];
        if (!['colorado.edu', 'colostate.edu', 'sdsu.edu'].includes(domain)) {
          throw new Error('Please use your university email address');
        }
      }

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError || !authData.user) {
        throw signUpError || new Error('Failed to create account');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: data.username,
            email: data.email,
            type: type,
            university: type === 'student' ? data.email.split('@')[1] : null,
          }
        ]);

      if (profileError) {
        // If profile creation fails, clean up the auth user
        await supabase.auth.signOut();
        throw profileError;
      }

      setUser({
        id: authData.user.id,
        email: data.email,
        username: data.username,
        university: type === 'student' ? data.email.split('@')[1] : undefined,
      });
      setUserType(type);

      toast.success('Account created successfully!');
      navigate(type === 'student' ? '/dashboard/student' : '/dashboard/employer');
    } catch (error: any) {
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        toast.error('An account with this email already exists. Please log in instead.');
      } else {
        toast.error(error.message || 'Failed to create account');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setUserType(null);
      navigate('/');
      toast.success('Successfully logged out');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          avatar: data.avatar,
          bio: data.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      setUser({ ...user, ...data });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      login,
      logout,
      signup,
      updateUserProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};