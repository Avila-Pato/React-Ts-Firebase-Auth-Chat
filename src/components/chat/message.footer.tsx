import { Button } from "../ui/button"
import { BsEmojiLaughingFill } from "react-icons/bs";
import { Input } from "../ui/input";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

/**
 * Renders the footer component for a chat message input.
 * 
 * The footer includes an emoji picker button, an input field for the message text, and a send button.
 * 
 * The component manages the state of the message text and the visibility of the emoji picker.
 * When the user clicks an emoji, it is added to the message text.
 * When the user clicks the send button, the message is logged to the console (simulating sending to a server).
 * The message input and emoji picker are then cleared.
 */
const MessagesFooter = () => {
    const [message, setMessage] = useState("")
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    // manejando onEmoji Click para previamente mostrarlo en el chat
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji)
    }


    const handleSendMessage = () => {
        if (!message) {
            return
        }
        // enviar el mensaje al servidor (texting) para luego enviarlo a la abse de  datos en firebase
        console.log(message)
        // cerrar el mensaje para limpiar el input
        setMessage("")
        // cerrar el emoji picker para limpiar el input al enviar emojis
        setShowEmojiPicker(false)

    }





    return (
        <footer className="border-t p-4 flex gap-x-4">
            {/* // Emoji Picker entra a estado true cuando se presiona el botón de emoji */}
            <Button onClick={() => setShowEmojiPicker(prev => !prev)}>
                <BsEmojiLaughingFill className="text-xl" />
            </Button>
            <div className="absolute bottom-12">
                <EmojiPicker
                    open={showEmojiPicker}
                    onEmojiClick={onEmojiClick}
                />
            </div>

            <Input
                placeholder="Escriba su mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Enviar</Button>

        </footer>
    )
}

export default MessagesFooter