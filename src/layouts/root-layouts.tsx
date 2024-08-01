
import ChatLayout from "./chat-layout";
import AuthLayout from "./auth-layout";
import { useSigninCheck } from "reactfire";
import { useLoadingStore } from "@/store/loading.store";


const RootLayouts = () => {


  const { status, data: signInCheckResult } = useSigninCheck();
  const { loading } = useLoadingStore()




  // Construyendo el laoding y verificando el usuario
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
        signInCheckResult.signedIn && !loading ? (
          <ChatLayout />
        )
          : (

            <AuthLayout />

          )}
    </div>
  )
}

export default RootLayouts