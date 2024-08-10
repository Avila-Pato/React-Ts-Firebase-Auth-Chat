import { useChatStore } from "@/store/chat-store";
import { Button } from "../ui/button";

const MessagesHeader = () => {
    const { resetFriend, friend } = useChatStore();

    return (
        <header className="border-b p-4 flex items-center gap-x-4 max-sm:flex-col max-sm:gap-y-4">
            <img
                src={friend?.photoURL}
                alt={friend?.displayName || "Friend"}
                className="rounded-md w-14 h-14 object-cover max-sm:w-20 max-sm:h-20"
            />
            <div className="flex flex-col">
                <p className="text-lg font-semibold text-gray-700">
                    {friend?.displayName}</p>
                <p className="text-xs text-gray-500">Activo</p>
            </div>
            <div className="ml-auto max-sm:ml-0 max-sm:w-full max-sm:text-center">
                <Button onClick={resetFriend} className="w-full max-sm:w-auto">
                    Cerrar Chat
                </Button>
            </div>
        </header>
    )
}

export default MessagesHeader;
