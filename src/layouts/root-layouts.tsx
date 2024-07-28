
import ChatLayout from "./chat-layout";
import AuthLayout from "./auth-layout";


const RootLayouts = () => {





  const user = true;

  return (
    <div className=" ">
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