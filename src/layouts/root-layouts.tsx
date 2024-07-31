
import ChatLayout from "./chat-layout";
import AuthLayout from "./auth-layout";
import { useUser } from "reactfire";


const RootLayouts = () => {

  // Construyendo el laoding y verificando el usuario
  const { status, data: user } = useUser();



  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">

        <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-b-8 border-gray-900 "></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      {
        user ? (
          <ChatLayout />
        )
          : (

            <AuthLayout />

          )}
    </div>
  )
}

export default RootLayouts