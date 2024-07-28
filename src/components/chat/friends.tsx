import FriendItem from "./friend-item";
import FriendSearch from "./friend-search";
import { useState, useEffect } from "react";

interface Friend {
    uid: string,
    displayName: string,
    photoURL: string,
    latMessage: string,
}

const Friends = () => {
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        const getFriends = async () => {
            const response = await fetch('https://randomuser.me/api/?results=15&nat=BR&noinfo');
            const results = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = results.results.map((user: any) => ({
                uid: user.login.uuid,
                displayName: user.name.first,
                photoURL: user.picture.thumbnail,
                latMessage: `Hola, soy ${user.name.first}. Vivo en ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}.`,
            }));
            setFriends(data);
        }
        getFriends();
    }, []);

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen border-r">
            <section className="border-b p-4">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Chats</h2>
                <FriendSearch />
            </section>
            <section className="custom-scrollbar">
                {
                    friends.map((friend) => (
                        <FriendItem key={friend.uid}
                            // Spread operator
                            {...friend} />
                    ))
                }
            </section>
        </div>
    )
}

export default Friends;
