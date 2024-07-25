import  Login  from "@/components/auth/login"; 
import Register from "@/components/auth/register";


const RootLayouts = () => {

    const user = false;

  return (
    <div className=" ">
        {
            user ? ( <h1>Bienvenido</h1>)
             : (

              <main className="bg-indigo-200 
              ">
                <div className="min-h-screen grid md:grid-cols-2
              md:place-content-center md:place-items-center 
              sm:grid-cols-2
              sm:place-content-center sm:place-items-center " >
            <Login />
            <Register />
            </div>

              </main>
              
            )}
    </div>
  )
}

export default RootLayouts