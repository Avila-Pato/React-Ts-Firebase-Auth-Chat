import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDB } from "@/schemas/firetore-schema";
import { Friend } from "@/store/chat-store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import {
  arrayUnion,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useAuth, useFirestore } from "reactfire";




const updateLastMessage = async (
  db: Firestore,
  uid: string,
  roomId: string,
  message: string
) => {
  // actualizar el ultimo mensaje en la base de datos
  const userRef = doc(db, "users", uid);
  const { rooms } = (await getDoc(userRef)).data() as UserDB;

  const roomUpdateLastMessage = rooms.map((room) => {
    if (room.roomId === roomId) {
      return {
        ...room,
        lastMessage: message,
        timestamp: new Date().toISOString(),
      };
    }
    return room;
  });
  await updateDoc(userRef, {
    rooms: roomUpdateLastMessage,
  });
};

interface MessagesFooterProps {
  friend: Friend;
}

const MessagesFooter = ({ friend }: MessagesFooterProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const db = useFirestore();
  const auth = useAuth();

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    // Clear the input immediately
    const currentMessage = message;
    setMessage("");

    try {
      const roomRef = doc(db, "rooms", friend.roomId);
      await updateDoc(roomRef, {
        messages: arrayUnion({
          message: currentMessage,
          timestamp: new Date().toISOString(),
          uid: auth.currentUser!.uid,
        }),
      });

      
      console.log('Current Message:', currentMessage);
console.log('Room ID:', friend.roomId);
console.log('User UID:', auth.currentUser?.uid);


      const currentRoomId = friend.roomId;
      // Actualizar lastMessage
      await updateLastMessage(
        db,
        auth.currentUser!.uid,
        currentRoomId,
        currentMessage
      );
      

   await  updateLastMessage(db, friend.uid, currentRoomId, currentMessage);


      
      setShowEmojiPicker(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevenir el comportamiento predeterminado del Enter
      handleSendMessage();
    }
  };

  return (
    <footer className="border-t p-4 flex gap-x-2">
      <div className="relative">
        <Button onClick={() => setShowEmojiPicker((prev) => !prev)}>
          <BsEmojiSmileFill className="text-lg" />
        </Button>
        {showEmojiPicker && (
          <div className="absolute bottom-12">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <Input
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSendMessage}>Enviar</Button>
    </footer>
  );
};

export default MessagesFooter;
