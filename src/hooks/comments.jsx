import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";

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
        likes: [],
      });
      toast.success("Commented!");
    } catch (error) {
      toast.error(error.message);
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

export const useToggleCommentLike = (commentID, isLiked, uid) => {
  const [loading, setLoading] = useState(false);
  const toggleCommentLike = async () => {
    setLoading(true);
    const docRef = doc(db, "comments", commentID);
    try {
      await updateDoc(docRef, {
        likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
      });
    } catch {
      toast.error("Error occured in liking comment");
    }
    setLoading(false);
  };
  return { toggleCommentLike, loading };
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

export const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const deleteComment = async (commentID) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "comments", commentID));
      toast.success("Comment Deleted!");
    } catch {
      toast.error("Error deleting comment");
    }
    setLoading(false);
  };
  return { deleteComment, loading };
};
