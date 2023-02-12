import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const ref = doc(db, "users", user.uid);
      const docSnap = await getDoc(ref);
      setUserData(docSnap.data());
      setIsLoading(false);
    }
    if (!loading) {
      if (user) fetchData();
      else setIsLoading(false);
    }
  }, [loading, user]);
  return {
    user: userData,
    loading: isLoading,
    error,
  };
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initiateLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      return false;
    }
    return true;
  };

  return {
    initiateLogin,
    loading: isLoading,
  };
};

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initiateSignup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        name: name,
        date: Date.now(),
      });
      toast.success("Account created!");
      navigate("/home");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    initiateSignup,
    loading: isLoading,
  };
};

export const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const initiateLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out!");
      navigate("/auth");
    } catch (err) {
      toast.error(err);
    }
  };
  return {
    initiateLogout,
    loading,
  };
};
