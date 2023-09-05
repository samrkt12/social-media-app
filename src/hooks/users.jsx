import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";

export const useGetUser = (uid) => {
  const q = query(doc(db, "users", uid));
  const [user, loading, error] = useDocumentData(q);
  if (error) throw error;
  return { user, loading };
};

export const useGetAllUsers = () => {
  const q = query(collection(db, "users"));
  const [users, loading, error] = useCollectionData(q);
  if (error) throw error;
  return { users, loading };
};

export const useUpdateUser = (uid) => {
  const [loading, setLoading] = useState(false);
  const updateUser = async ({
    isDpChosen,
    isCoverChosen,
    nameValue,
    bioValue,
    selectedCover,
    selectedDisplayImage,
  }) => {
    setLoading(true);
    let configObj;
    try {
      if (isDpChosen) {
        const fileRef = ref(storage, "profileImages/" + uid);
        await uploadBytes(fileRef, selectedDisplayImage);
        const dpURL = await getDownloadURL(fileRef);
        configObj = { displayImg: dpURL };
      }
      if (isCoverChosen) {
        const fileRef = ref(storage, "coverImages/" + uid);
        await uploadBytes(fileRef, selectedCover);
        const coverURL = await getDownloadURL(fileRef);
        configObj = { ...configObj, coverImg: coverURL };
      }
      const docRef = doc(db, "users", uid);
      configObj = { ...configObj, name: nameValue, bio: bioValue };
      await updateDoc(docRef, configObj);
    } catch {
      toast.error("Error occured in the updating profile");
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  };
  return { updateUser, loading };
};

export const useToggleFollowUser = (uid, isFollowing, ownID) => {
  const [loading, setLoading] = useState(false);
  const toggleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await updateDoc(doc(db, "users", uid), {
          followers: arrayRemove(ownID),
        });
        await updateDoc(doc(db, "users", ownID), {
          following: arrayRemove(uid),
        });
        toast.success("Unfollowed");
      } else {
        await updateDoc(doc(db, "users", uid), {
          followers: arrayUnion(ownID),
        });
        await updateDoc(doc(db, "users", ownID), {
          following: arrayUnion(uid),
        });

        toast.success("Following");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in following!");
    }
    setLoading(false);
  };
  return {
    toggleFollow,
    loading,
  };
};
