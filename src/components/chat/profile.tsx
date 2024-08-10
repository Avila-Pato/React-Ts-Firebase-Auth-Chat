import { useAuth, useUser } from "reactfire";
import { Button } from "../ui/button";
import { useChatStore } from "@/store/chat-store";

const Profile = () => {
    const auth = useAuth();
    const { data: user } = useUser();
    const { resetFriend } = useChatStore();

    const handleClickOut = async () => {
        resetFriend();
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="p-4  mt-3 text-center border-l max-sm:border-l-0 max-sm:border-t">
            {user && user.photoURL ? (
                <>
                    <img
                        src={user?.photoURL || "avatar.png"}
                        alt="Perfil"
                        className="rounded-full mb-4 mx-auto w-24 h-24 max-sm:w-20 max-sm:h-20 object-cover"
                    />
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Perfil</h2>
                    <p className="font-semibold mb-2 text-gray-800">{user?.displayName || "No hay Nombre"}</p>
                    <p className="text-gray-500 mb-4">{user?.email}</p>
                    <Button onClick={handleClickOut} className="w-full max-sm:w-auto max-sm:px-6">
                        Desconectarse
                    </Button>
                </>
            ) : (
                <p className="text-gray-500 text-lg animate-pulse">Cargando Usuario...</p>
            )}
        </div>
    );
};

export default Profile;
