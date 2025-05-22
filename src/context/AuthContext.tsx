import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

type UniversityType = "colorado.edu" | "colostate.edu" | "sdsu.edu";

interface AuthUser {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  bio?: string;
  university?: UniversityType;
}

type UserType = "student" | "employer" | null;

interface AuthContextType {
  user: AuthUser | null;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: any, type: UserType) => Promise<void>;
  updateUserProfile: (data: Partial<AuthUser>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profileRef = doc(db, "profiles", firebaseUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const profile = profileSnap.data();

          setUser({
            id: firebaseUser.uid,
            email: profile.email,
            username: profile.username,
            avatar: profile.avatar,
            university: profile.university,
            bio: profile.bio,
          });

          setUserType(profile.type);
        } else {
          setUser(null);
          setUserType(null);
        }
      } else {
        setUser(null);
        setUserType(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, type: UserType) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user) {
        throw new Error("Login failed");
      }

      const profileRef = doc(db, "profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        throw new Error("Profile not found");
      }

      const profile = profileSnap.data();

      if (profile.type !== type) {
        await auth.signOut();
        throw new Error("Please use the correct login for your account type");
      }

      setUser({
        id: user.uid,
        email: profile.email,
        username: profile.username,
        avatar: profile.avatar,
        university: profile.university,
        bio: profile.bio,
      });

      setUserType(profile.type);

      toast.success("Successfully logged in!");
      navigate(
        type === "student" ? "/dashboard/student" : "/dashboard/employer"
      );
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const signup = async (data: any, type: UserType) => {
    try {
      if (type === "student") {
        const domain = data.email.split("@")[1];
        if (!["colorado.edu", "colostate.edu", "sdsu.edu"].includes(domain)) {
          throw new Error("Please use your university email address");
        }
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      if (!user) {
        throw new Error("Failed to create account");
      }

      // Store additional user data in Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        id: user.uid,
        username: data.username,
        email: data.email,
        type: type,
        university: type === "student" ? data.email.split("@")[1] : null,
      });

      // Update local state
      setUser({
        id: user.uid,
        email: data.email,
        username: data.username,
        university: type === "student" ? data.email.split("@")[1] : undefined,
      });

      setUserType(type);

      toast.success("Account created successfully!");
      navigate(
        type === "student" ? "/dashboard/student" : "/dashboard/employer"
      );
    } catch (error: any) {
      if (error.message?.includes("email-already-in-use")) {
        toast.error(
          "An account with this email already exists. Please log in instead."
        );
      } else {
        toast.error(error.message || "Failed to create account");
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      setUserType(null);
      navigate("/");
      toast.success("Successfully logged out");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error("No user logged in");

      const profileRef = doc(db, "profiles", user.id);

      await updateDoc(profileRef, {
        username: data.username,
        avatar: data.avatar,
        bio: data.bio,
        updated_at: new Date().toISOString(),
      });

      setUser({ ...user, ...data });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        login,
        logout,
        signup,
        updateUserProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
