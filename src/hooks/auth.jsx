import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, GoogleProvider, storage } from "../firebase";
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

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initiateSignup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const obj = await fetch("https://picsum.photos/1100/200");
      const randomCoverURL = obj.url;
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        name: name,
        userDate: Date.now(),
        email: email,
        bio: "",
        displayImg: `https://ui-avatars.com/api/?name=${name}&length=1&background=random`,
        coverImg: randomCoverURL,
        following: [],
        followers: [],
      });
      toast.success("Account created!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        toast.error("Email already in use.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    initiateSignup,
    loading: isLoading,
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
      if (error.message === "Firebase: Error (auth/user-not-found).")
        toast.error("User not found. Please signup first.");
      else if (error.message === "Firebase: Error (auth/wrong-password).")
        toast.error("Wrong password. Please enter correct password.");
      else {
        toast.error(error.message);
      }
      setIsLoading(false);
      return false;
    }
    return true;
  };

  return {
    initiateLogin,
    loading: isLoading,
  };
};

export const useSignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, GoogleProvider);
      const isNew = getAdditionalUserInfo(res).isNewUser;
      if (isNew) {
        console.log(isNew);
        const obj = await fetch("https://picsum.photos/1100/200");
        const randomCoverURL = obj.url;
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          name: res.user.displayName,
          userDate: Date.now(),
          email: res.user.email,
          bio: "",
          displayImg: res.user.photoURL,
          coverImg: randomCoverURL,
          following: [],
          followers: [],
        });
      }
      toast.success("Logged In!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    signInWithGoogle,
    loading,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const [signOut, loading, error] = useSignOut(auth);
  if (error) throw error;
  const initiateLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out!");
      navigate("/auth");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return {
    initiateLogout,
    loading,
  };
};
