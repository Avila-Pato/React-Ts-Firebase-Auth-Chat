import { z } from 'zod';
import { formulario as formSchema } from '@/lib/zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from 'reactfire';
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { useLoadingStore } from '@/store/loading.store';
import { Spinner } from '../ui/spiner';

const Login = ({ onLoginRequest }: { onLoginRequest: () => void }) => {

  const auth = useAuth();
  const { loading, setLoading } = useLoadingStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Correo: "",
      Contraseña: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Manejar el inicio de sesión aquí

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth,
        values.Correo,
        values.Contraseña);

    } catch (error) {
      console.log(error);
      const firebaserError = error as AuthError;

      // agregando logica al Manejar el error de inicio de sesión y password.

      if (firebaserError.code === 'auth/invalid-login-credentials') {
        form.setError("Correo", {
          type: "manual",
          message: "Correo incorrecto.",
        })
        form.setError("Contraseña", {
          type: "manual",
          message: "Contraseña incorrecta.",
        })
      }

    } finally {
      setLoading(false);
    }

  }

  return (
    <Card className='bg-white shadow-lg rounded-lg'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>Login</CardTitle>
        <CardDescription className='text-gray-500'>
          Bienvenido, ¡Inicia sesión para continuar!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="Correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="user@docemail.com" className="border-gray-300 rounded-md shadow-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Contraseña"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="Contraseña" type="password" className="border-gray-300 rounded-md shadow-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={`w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2 flex justify-center items-center ${loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" /> {/* Añade un pequeño margen entre el spinner y el texto */}
                  Cargando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </Form>

        {/* Agrega un enlace para registrarse */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={onLoginRequest}
              className="text-blue-500 hover:underline"
            >
              Regístrate
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
