import { uuidv4 } from "@firebase/util";
import {
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const addComment = async (postID, uid, comment) => {
    setLoading(true);
    const id = uuidv4();
    try {
      await setDoc(doc(db, "comments", id), {
        commentID: id,
        userID: uid,
        postID: postID,
        commentText: comment.text,
        blockComment: false,
        createdAt: Date.now(),
      });
      toast.success("Commented!");
    } catch {
      setLoading(false);
      toast.error("Error adding comment!");
      return false;
    }
    setLoading(false);
    return true;
  };
  return {
    addComment,
    loading,
  };
};

export const useGetComments = (postID) => {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("createdAt", "asc")
  );
  const [comments, loading, error] = useCollectionData(q);
  if (error) throw error;
  return { comments, loading };
};
