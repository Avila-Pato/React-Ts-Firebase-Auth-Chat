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

const Login = () => {
  // Define el Hook useForm dentro del componente funcional
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Correo: "",
      Contraseña: "",
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
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Bienvenido, ! Por Favor Registra tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
