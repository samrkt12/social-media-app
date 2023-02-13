import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const createPost = async (post, uid, selectedImage) => {
    setLoading(true);
    const id = uuidv4();
    let postImageURL = "";
    try {
      if (selectedImage) {
        try {
          const fileRef = ref(storage, "postImages/" + id);
          await uploadBytes(fileRef, selectedImage);
          postImageURL = await getDownloadURL(fileRef);
        } catch (error) {
          toast.error("Error uplaoding image");
          setLoading(false);
          return false;
        }
      }
      await setDoc(doc(db, "posts", id), {
        postID: id,
        userID: uid,
        postText: post.text,
        blockPost: false,
        privacy: post.privacy,
        createdAt: Date.now(),
        postImg: postImageURL ? postImageURL : "",
        likes: [],
        saves: [],
      });
      toast.success("Posted !");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      return false;
    }
    setLoading(false);
    return true;
  };
  return { createPost, loading };
};

export const useGetHomePosts = (uid) => {
  const q =
    // uid
    //   ? query(
    //       collection(db, "posts"),
    //       orderBy("createdAt", "desc"),
    //       where("userID", "==", uid)
    //     )
    //   :
    query(collection(db, "posts"), orderBy("createdAt", "desc"));

  const [posts, loading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, loading };
};

export const useTogglePostLike = (postID, isLiked, uid) => {
  const [loading, setLoading] = useState(false);
  const togglePostLike = async () => {
    setLoading(true);
    const docRef = doc(db, "posts", postID);
    try {
      await updateDoc(docRef, {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
    } catch {
      toast.error("No UID");
    }
    setLoading(false);
  };
  return {
    togglePostLike,
    loading,
  };
};

export const useTogglePostSave = (postID, isSaved, uid) => {
  const [loading, setLoading] = useState(false);
  const togglePostSave = async () => {
    setLoading(true);
    const docRef = doc(db, "posts", postID);
    try {
      await updateDoc(docRef, {
        saves: isSaved ? arrayRemove(uid) : arrayUnion(uid),
      });
    } catch {
      toast.error("Error toggling save!");
    }
    setLoading(false);
  };
  return {
    togglePostSave,
    loading,
  };
};
