import { z } from 'zod';
import { registracion  as formSchema} from '@/lib/zod';
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

const Register = () => {
  // Define el Hook useForm dentro del componente funcional
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

  // Define la función de submit dentro del componente funcional
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='p-5 w-full max-w-md mx-auto'>
      <Card className='bg-white'> 
        <CardHeader>
          <CardTitle>Registrate</CardTitle>
          <CardDescription>
            Por Favor, Llena los campos de abajo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"
        >

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe tu usuario" {...field} />
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
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="user@docemail.com" {...field} />
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
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type= "password" placeholder="Contraseña" {...field} />
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
                <FormLabel>Confirmar Contraseña</FormLabel>
                <FormControl>
                  <Input type= "password"placeholder="Confirmar Contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="photoURL"
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: {value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input  {...fieldProps}
                  placeholder='Imagen' 
                  type='file'
                  accept='image/*, aplication/pdf'
                  onChange={(event)=> 
                    onChange(event.target.files && event.target.files[0])
                  }/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Registrate</Button>
        </form>
      </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
