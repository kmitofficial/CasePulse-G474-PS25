import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./NewChatButton.module.css";

function NewChatButton() {
  const navigate = useNavigate();

  const handleNewChat = () => {
    const chatId = uuidv4();
    navigate(`/chat/${chatId}`);
  };

  return (
    <button
      className={styles.button}
      onClick={handleNewChat}
      aria-label="New Chat"
    >
      +
    </button>
  );
}

export default NewChatButton;
