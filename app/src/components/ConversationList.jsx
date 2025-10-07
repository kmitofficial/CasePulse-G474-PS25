import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ConversationList() {
  const [user] = useAuthState(auth);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function fetchTitles() {
      if (!user?.email) return;
      // LOG for debugging
      console.log("Fetching chats for:", user.email);

      const convRef = collection(db, "chats", user.email, "conversations");
      const snapshot = await getDocs(convRef);
      console.log("Found docs:", snapshot.docs.length);

      setConversations(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    }
    fetchTitles();
  }, [user]);

  if (!user?.email) return <div>Not logged in!</div>;
  if (!conversations.length) return <div>No conversations found.</div>;

  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map(c => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
