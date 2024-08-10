import { doc, getDoc, onSnapshot } from "firebase/firestore";
import FriendItem from "./friend-item";
import FriendSearch from "./friend-search";
import { useState, useEffect } from "react";
import { UserRoom } from "@/schemas/firetore-schema";
import { useAuth, useFirestore } from "reactfire";


interface Friend {
    uid: string;
    displayName: string;
    photoURL: string;
    lastMessage: string;
    roomId: string;
}

const Friends = () => {
    // Estado para almacenar la lista de amigos
    const [friends, setFriends] = useState<Friend[]>([]);
    // Referencia a la base de datos de Firestore
    const db = useFirestore();
    // Referencia al objeto de autenticación de Firebase
    const auth = useAuth();

    

    useEffect(() => {
        // Función para obtener amigos desde una API externa
        const getFriends = async () => {
            try {
                // Llama a una API externa para obtener datos de usuarios aleatorios
                const response = await fetch('https://randomuser.me/api/?results=15&nat=BR&noinfo');
                const results = await response.json();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data = results.results.map((user: any) => ({
                    uid: user.login.uuid,
                    displayName: user.name.first,
                    photoURL: user.picture.thumbnail,
                    latsMessage: `Hola, soy ${user.name.first}. Vivo en ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}.`,
                    roomId: '', // Inicializa con un valor vacío
                }));
                // Establece el estado con los datos obtenidos
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        }
        // Llama a la función para obtener los amigos
        getFriends();
    }, []);

    useEffect(() => {
        // Referencia al documento del usuario autenticado en Firestore
        const userRef = doc(db, "users", auth.currentUser!.uid);

        const unsubscribe = onSnapshot(userRef, async (document) => {
            try {
                // Mapea los identificadores de amigos a sus datos completos
                const friendPromises = document.data()?.rooms.map((room: UserRoom) => {
                    const friendRef = doc(db, "users", room.friendId);
                    return getDoc(friendRef);
                }) ?? [];
                // Espera a que se resuelvan todas las promesas para obtener los datos completos de los amigos
                const friendDocs = await Promise.all(friendPromises);
                const data = friendDocs.map((friendDoc) => {
                    const room = document.data()?.rooms.find((room: UserRoom) => room.friendId === friendDoc.id);
                    const friendData = friendDoc.data();
                    return {
                        uid: friendData.uid,
                        displayName: friendData.displayName,
                        photoURL: friendData.photoURL,
                        roomId: room?.roomId || '', // Asegúrate de tener un valor por defecto
                        lastMessage: room?.lastMessage || '', // Corregido de 'latsMessage' a 'lastMessage'
                    };
                });
                // Actualiza el estado con los datos de los amigos obtenidos
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friend data:", error);
            }
        });
        // Limpia la suscripción a los cambios cuando el componente se desmonta
        return unsubscribe;
    }, [auth, db]);

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen border-r">
            <section className="border-b p-4">
                <h2 className="text-xl font-bold ml-1 text-gray-700 mb-2">Chats</h2>
                <FriendSearch />
            </section>
            <section className="custom-scrollbar">
                {
                    friends.map((friend) => (
                        <FriendItem key={friend.uid} {...friend} />
                    ))
                }
            </section>
        </div>
    );
}

export default Friends;
