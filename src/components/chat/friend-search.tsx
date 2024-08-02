import { searchFormSchema as formSchema } from "@/lib/zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDoc, arrayUnion, collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { useAuth, useFirestore } from "reactfire";
import { RoomDB, UserRoom } from "@/schemas/firetore-schema";

const FriendSearch = () => {
    const db = useFirestore();
    const auth = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Lógica para buscar amigos.
        try {
            // Verificacion de correo para no buscarte a ti mismo
            if (auth.currentUser?.email === values.email) {
                form.setError("email", {
                    type: "manual",
                    message: "No puedes buscar a ti mismo.",
                });
                return;
            }



            const q = query(collection(db, "users"),
                where("email", "==", values.email), limit(1));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                form.setError("email", {
                    type: "manual",
                    message: "No se encontró ningún usuario con ese correo.",
                });
                return;
            }

            //utilizando el metodo forEach  para traer el elemento de amigo que se encuentra en la base de datos en el chat


            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });

            // Lógica para agregar amigos. 


            //1- buscar amigo
            const friendDB = querySnapshot.docs[0].data();

            // verificar si ya son amigos

            const q2 = query(
                collection(db, "users"),
                where("uid", "==", auth.currentUser!.uid),
                where("friends", "array-contains", friendDB.uid)
            );

            const querySnapshot2 = await getDocs(q2);

            if (!querySnapshot2.empty) {
                form.setError("email", {
                    type: "manual",
                    message: "Ya son amigos.",
                });
                return;
            }



            //1.1- crear sala
            const newRoomDB: RoomDB = {
                messages: [],
                users: [auth.currentUser?.uid, friendDB.uid],
            };
            const roomRef = await addDoc(collection(db, "rooms"), newRoomDB);
            console.log("1. Sala creada correctamente");



            //1.2- agregar sala a la lista de salas de ambos usuarios

            const currentUserRoom: UserRoom = {
                roomId: roomRef.id,
                lastMessage: "",
                timestamp: "",
                friendId: friendDB.uid,

            }

            const friendRoom: UserRoom = {
                roomId: roomRef.id,
                lastMessage: "",
                timestamp: "",
                friendId: auth.currentUser!.uid,

            }

            // Actuliando los documentos



            const currentUserRef = doc(db, "users", auth.currentUser!.uid);
            const friendRef = doc(db, "users", friendDB.uid);


            await updateDoc(currentUserRef, {
                rooms: arrayUnion(currentUserRoom),
                friends: arrayUnion(friendDB.uid),
            })
            console.log("2. Usuario agregado a la correctamente");

            await updateDoc(friendRef, {
                rooms: arrayUnion(friendRoom),
                friends: arrayUnion(friendDB.uid),
            })
            console.log("Amigo agregado correctamente");

            //actualizar la sala
            form.reset();




        } catch (error) {
            console.error("Error al buscar amigos:", error);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Ingresa el correo"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full"
                >
                    Busca a un amigo
                </Button>
            </form>
        </Form>
    );
};
export default FriendSearch;