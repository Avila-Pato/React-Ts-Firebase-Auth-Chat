import { cn } from "@/lib/utils";

interface MessageProps {
    message: string;
    time: string;
    photoURL: string | null;
    isCurrentUser: boolean;
    
  }

const Message = ({
    message,
    time,
    photoURL,
    isCurrentUser,
}: MessageProps) => {
    return (
        <article className={cn(
            "flex gap-x-2", {
            "flex-row-reverse": isCurrentUser,
            "flex-row": !isCurrentUser,
        })

        }>
            <img
                src={photoURL || "/default-avatar.png"}
                alt=""
                className="rounded-full size-10"
            />
            <div className={cn(
                "rounded-lg p-2 text-gray-700 max-w-[70%]", {
                "bg-blue-200": isCurrentUser,
                "bg-white": !isCurrentUser,
            }

            )}>
                <p className="">{message}</p>
                <p className="text-right text-xs">{time}</p>
            </div>
        </article>
    );
};

export default Message;

// //Este componente está diseñado para mostrar mensajes de chat de manera que los mensajes del usuario actual se alineen a la derecha y tengan un fondo azul claro, mientras que los mensajes de otros usuarios se alinean a la izquierda y tienen un fondo blanco. La imagen de perfil del usuario se muestra junto a cada mensaje.
// segun su estado en isCurrentProps renderizandolo en message-chats en true o false