import { useEffect, useRef } from "react";
import Message from "./message";

const MessagesChat = () => {
        //useRef hace que el scrrol llegue hasta abajo al actulizar o entra al login 
    const containerRef = useRef<HTMLDivElement>(null);
    // useEfect solo lo ejecuta 1 vez despues de priemr renderiado
    //El scrollTop se ajusta en useefect
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    const messages = [
        {
            message: "Hola, ¿Cómo estás?",
            time: "10:00 AM",
            photoURL: "https://randomuser.me/api/portraits/thumb/women/47.jpg",
            isCurrentUser: false,
        },
        {
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti maxime est at molestiae corrupti nesciunt dolor quaerat quisquam recusandae odit ex nulla tempore vero assumenda quae minus quo, et deserunt.",
            time: "Ahora mismo",
            photoURL: "https://randomuser.me/api/portraits/men/95.jpg",
            isCurrentUser: true,
        }
    ];

    return (
        <main
            className="bg-indigo-100 p-4 space-y-2 custom-scrollbar"
            ref={containerRef}
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index}>
                    <Message
                        message={messages[0].message}
                        time={messages[0].time}
                        photoURL={messages[0].photoURL}
                        isCurrentUser={messages[0].isCurrentUser}
                    />
                    <Message
                        message={messages[1].message}
                        time={messages[1].time}
                        photoURL={messages[1].photoURL}
                        isCurrentUser={messages[1].isCurrentUser}
                    />
                </div>
            ))}
        </main>
    );
};

export default MessagesChat;



























// import Message from "./message";




// const MessagesChat = () => {
//     return (
//         <main className="bg-indigo-100 p-4 space-y-2">
//             {/* Chat de amigonen false isCurrentUser(false) */}
//             <Message
//                 message="Hola, ¿Cómo estás?"
//                 time="10:00 AM"
//                 photoURL="https://randomuser.me/api/portraits/thumb/women/47.jpg"
//                 isCurrentUser={false}
//             />
//             {/* Chat de perfil En True */}
//             <Message
//                 message=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti maxime est at molestiae corrupti nesciunt dolor quaerat quisquam recusandae odit ex nulla tempore vero assumenda quae minus quo, et deserunt.as"
//                 time="Ahora mismo"
//                 photoURL="https://randomuser.me/api/portraits/men/95.jpg"
//                 isCurrentUser={true}
//             />

            




//             {/* Chat de perfil */}
//             {/* <article className="flex gap-x-2 flex-row-reverse">
//                 <img
//                     src="https://randomuser.me/api/portraits/men/95.jpg"
//                     alt=""
//                     className="rounded-full size-10"
//                 />
//                 <div className="bg-blue-200 rounded-md p-2 text-gray-700 max-w-[70%]  relative">
//                     <p>
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti maxime est at molestiae corrupti nesciunt dolor quaerat quisquam recusandae odit ex nulla tempore vero assumenda quae minus quo, et deserunt.
//                     </p>
//                     <p className="text-right text-xs">Ahora mismo</p>
//                 </div>
//             </article> */}
//         </main>
//     );
// };

// export default MessagesChat;
