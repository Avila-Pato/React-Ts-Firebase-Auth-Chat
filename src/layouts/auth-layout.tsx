import { useState } from 'react';
import Login from '../components/auth/login';
import Register from '../components/auth/register';

const AuthLayout = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterSuccess = () => {
    setIsRegistered(true);
    setShowLogin(true); // Muestra el login después del registro
  };

  const handleLoginRequest = () => {
    setIsRegistered(false); // Vuelve al formulario de registro
    setShowLogin(false); // Muestra el formulario de registro si el usuario quiere registrarse
  };

  return (
    <div className='p-8 w-full max-w-md mx-auto'>
      {!isRegistered ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      ) : showLogin ? (
        <Login onLoginRequest={handleLoginRequest} />
      ) : (
        <div className='text-center'>
          <p className='text-lg font-medium'>¡Ya estás registrado!</p>
          <p className='mt-4 text-gray-600'>
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={handleLoginRequest}
              className='text-blue-500 hover:underline'
            >
              Haz clic aquí para iniciar sesión
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
