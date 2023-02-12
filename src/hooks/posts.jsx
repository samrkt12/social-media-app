import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const createPost = async (post, uid) => {
    setLoading(true);
    const id = uuidv4();
    try {
      await setDoc(doc(db, "posts", id), {
        postID: id,
        userID: uid,
        text: post.story,
        createdAt: Date.now(),
        postImg: post.image.length > 0 ? post.image[0].name : "",
        likes: [],
      });
      toast.success("Posted !");
    } catch (error) {
      setLoading(false);
      toast.error(error);
      return false;
    }
    setLoading(false);
    return true;
  };
  return { createPost, loading };
};
