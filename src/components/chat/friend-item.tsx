
interface FriendItemProps {
    displayName: string,
    photoURL: string,
    latMessage: string,
}


const FriendItem = ({
    displayName,
    photoURL,
    latMessage,

}: FriendItemProps) => {
    return (
        <article className="flex items-center gap-x-3 py-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
            <img src={photoURL}
                alt="image ramdon"
                className="w-16 h-16 rounded-md"
            />
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-700">{displayName}</h3>
                <p className="text-xs text-gray-500 truncate">{latMessage}</p>

            </div>
        </article>
    )
}

export default FriendItem