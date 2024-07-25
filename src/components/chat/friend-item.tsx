
const FriendItem = () => {
    return (
        <article className="flex items-center gap-x-3 py-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
            <img src="https://randomuser.me/api/portraits/men/57.jpg"
                alt="image ramdon"
                className="w-16 h-16 rounded-md"
            />
            <div>
                <h3 className="font-semibold text-md text-gray-800">Rafael</h3>
                <p className="text-xs text-gray-800">Lorem, ipsum dolor.</p>
            </div>
        </article>
    )
}

export default FriendItem