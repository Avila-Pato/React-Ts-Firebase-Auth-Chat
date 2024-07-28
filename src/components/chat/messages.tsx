import MessagesFooter from "./message.footer"
import MessagesChat from "./messages-chat"
import MessagesHeader from "./messages-header"



const Messages = () => {
    return (
        <article className="grid grid-rows-[auto_1fr_auto] h-screen">
            <MessagesHeader />
            <MessagesChat />
            <MessagesFooter />
        </article>
    )
}

export default Messages