import  Login  from "@/components/auth/login"; 
import Register from "@/components/auth/register";


const RootLayouts = () => {

    const user = false;

  return (
    <div className=" ">
        {
            user ? ( <h1>Bienvenido</h1>)
             : (
              <div className="h-screen bg-orange-300 grid grid-cols-2 flex flex-col items-center justify-center min-h-screen bg-gray-100" >
            <Login />
            <Register />
            </div>
            )}
    </div>
  )
}

export default RootLayouts