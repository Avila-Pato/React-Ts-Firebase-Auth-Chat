import { useAuth, useUser } from "reactfire"
import { Button } from "../ui/button"
// import { useEffect, useState } from "react"
// import { User } from "firebase/auth";


const Profile = () => {
    // desconectar usuario
    const auth = useAuth();
    const { data: user } = useUser();
    // const [user, setUser] = useState<User | null>(null);


    // metodo para cerrar sesion
    const handleClickOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }
    // console.log({
    //     currentUser: auth.currentUser,
    // });


    return (
        <div className="p-4 text-center border-l">
            {user && user.photoURL ? (
                <>
                    <img
                        src={user?.photoURL || "avatar.png"}
                        alt="Perfil"
                        className="rounded-md mb-4 mx-auto w-24 h-24"
                    />
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Perfil</h2>
                    <p className="font-semibold mb-2">{user?.displayName || "No hay Nombre"}</p>
                    <p className="text-gray-500 mb-2">{user?.email}</p>
                    <Button onClick={handleClickOut} className="w-full">Desconectarse</Button>
                </>
            ) : (
                <p className="text-gray-500 text-lg animate-pulse">Cargando Usuario...</p>

            )}
        </div>
    );
};

export default Profile;