
import { Button } from "../ui/button";

const MessagesHeader = () => {
    return (
        <header className="border-b p-4 flex items-center gap-x-4">
            <img
                src="https://randomuser.me/api/portraits/thumb/women/47.jpg"
                alt=""
                className="rounded-md size-20"
            />
            <div className="">
                <p className="text-lg font-semibold text-gray-700">Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-500">Activo</p>

            </div>
            <div className="ml-auto max-xs:text-center">
                <Button className="w-full">Cerrar Chat</Button>
            </div>
        </header>
    )
}

export default MessagesHeader