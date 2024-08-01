/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import { registracion as formSchema } from '@/lib/zod';
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

import { AuthError, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { useAuth, useStorage } from 'reactfire';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useLoadingStore } from '@/store/loading.store';

const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {


  // llamando al useAuth para registrar a usuarios 
  const auth = useAuth();
  const storage = useStorage();
  const { loading, setLoading } = useLoadingStore()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Correo: "",
      Contraseña: "",
      confirmPassword: "",
      displayName: "",
      photoURL: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Lógica para registrar al usuario en firebase
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.Correo,
        values.Contraseña);
      console.log("Usuario registrado exitosamente");

      // 1 GUARDAR AVATAR EN STORAGE

      const storageRef = ref(storage, "avatar" + user.uid + ".jpg");
      await uploadBytes(storageRef, values.photoURL);

      // 2 RECUPERAR LA URL DEL AVATAR

      const photoURL = await getDownloadURL(storageRef);

      // 3- Actualizar el perfil del usuario
      await updateProfile(user, {
        displayName: values.displayName,
        photoURL: photoURL,
      });


    } catch (error) {
      console.error("Error al registrar:", error);



      // Manejar el error de registro

      const firebaserError = error as AuthError;

      if (firebaserError.code === 'auth/email-already-in-use') {
        form.setError("Correo", {
          type: "manual",
          message: "El correo ya está en uso.",
        });
        return;
      }

      // Manejar otros errores de registro

      // if you want put other errors


      // se utiliza finalli porque en caso de errores el boton queda desabilitado
    } finally {

      setLoading(false)
    }


    // Llamar a onRegisterSuccess si el registro es exitoso
    onRegisterSuccess();
  }

  return (
    <Card className='bg-white shadow-lg rounded-lg'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>Registrate</CardTitle>
        <CardDescription className='text-gray-500'>
          Por Favor, Llena los campos de abajo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Escribe tu usuario" className="border-gray-300 rounded-md shadow-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input type="password" placeholder="Contraseña" className="border-gray-300 rounded-md shadow-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirmar Contraseña" className="border-gray-300 rounded-md shadow-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photoURL"

              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium'>Imagen</FormLabel>
                  <FormControl>
                    <Input {...fieldProps} placeholder='Imagen' type='file' accept='image/*, application/pdf' onChange={(event) => onChange(event.target.files && event.target.files[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-md py-2"
              disabled={loading}

            >Registrate</Button>
          </form>
        </Form>

        {/* Agregando un enlace para iniciar sesión */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={() => {
                // Aquí usa un callback o un contexto para cambiar el estado
                // del componente padre que maneja el registro y login
                onRegisterSuccess();
              }}
              className="text-blue-500 hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Register;
