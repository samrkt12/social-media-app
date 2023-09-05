import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
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
          toast.error(error.message);
          setLoading(false);
          return false;
        }
      }
      await setDoc(doc(db, "posts", id), {
        postID: id,
        userID: uid,
        postText: post.text,
        blockPost: false,
        createdAt: Date.now(),
        postImg: postImageURL ? postImageURL : "",
        likes: [],
        saves: [],
        likeCount: 0,
      });
      toast.success("Posted !");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      return false;
    }
    setLoading(false);
    return true;
  };
  return { createPost, loading };
};

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const deletePost = async (postID) => {
    setLoading(true);
    try {
      const postDoc = await getDoc(doc(db, "posts", postID));
      await deleteDoc(doc(db, "posts", postID));
      const q = query(
        collection(db, "comments"),
        where("postID", "==", postID)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (doc) => deleteDoc(doc.ref));
      if (postDoc.data().postImg) {
        const desertRef = ref(storage, "postImages/" + postID);
        await deleteObject(desertRef);
      }
      toast.success("Post Deleted!");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return { deletePost, loading };
};

export const useTogglePostLike = (postID, isLiked, uid) => {
  const [loading, setLoading] = useState(false);
  const togglePostLike = async () => {
    setLoading(true);
    const docRef = doc(db, "posts", postID);
    try {
      const postDoc = await getDoc(docRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const newLikeCount = isLiked
          ? postData.likeCount - 1
          : postData.likeCount + 1;
        await updateDoc(docRef, {
          likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
          likeCount: newLikeCount,
        });
      }
    } catch (error) {
      toast.error(error.message);
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
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return {
    togglePostSave,
    loading,
  };
};

export const useGetHomePosts = (uid, filter) => {
  const baseQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  let q;
  if (filter === "latest") {
    q = baseQuery;
  } else if (filter === "top") {
    q = query(collection(db, "posts"), orderBy("likeCount", "desc"));
  } else {
    q = baseQuery;
  }

  if (uid) {
    q = query(q, where("userID", "==", uid));
  }

  const [posts, loading, error] = useCollectionData(q);

  if (error) throw error;
  return { posts, loading };
};

export const useGetSavedPosts = (uid) => {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("saves", "array-contains", uid)
      )
    : "";
  const [posts, loading, error] = useCollectionData(q);

  if (error) throw error;
  return { posts, loading };
};
