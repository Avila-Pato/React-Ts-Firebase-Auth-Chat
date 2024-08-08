
import { useChatStore } from "@/store/chat-store";
import { Button } from "../ui/button";

const MessagesHeader = () => {
     const { resetFriend, friend} = useChatStore();

    return (
        <header className="border-b p-4 flex items-center gap-x-4">
            <img
                src={friend?.photoURL }
                alt=""
                className="rounded-md size-20"
            />
            <div className="">
                <p className="text-lg font-semibold text-gray-700">
                    {friend?.displayName}</p>
                <p className="text-xs text-gray-500">Activo</p>

            </div>
            <div className="ml-auto max-xs:text-center">
                <Button onClick={resetFriend} className="w-full">Cerrar Chat</Button>
            </div>
        </header>
    )
}

export default MessagesHeader