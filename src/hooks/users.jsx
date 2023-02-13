import { doc, query } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export const useGetUser = (uid) => {
  const q = query(doc(db, "users", uid));
  const [user, loading, error] = useDocumentData(q);
  if (error) throw error;
  return { user, loading };
};
