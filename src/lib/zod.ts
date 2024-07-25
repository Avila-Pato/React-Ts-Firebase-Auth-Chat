import { z } from 'zod'

export const formulario = z.object({
    Correo: z.string().email(),
        Contraseña: z.string().min(6, "Contraseña debe tener minimo 6 palabras"),
    
})

export const registracion = z.
object({
    photoURL: z
    .instanceof(File, {
        message: "Por favor infrese una imagen valida" 
    })
    .refine((data) => data.size < 2 * 1024 * 1024, {
        message: "La imagen debe pesar menos de 2MB"
    }),
    displayName: z
    .string()
    .min(1, "Nombre es obligatorio")
    .max(12,"Nombre debe tener minimo 12 palaras o menos"),
    Correo: z.string().email("Por favor ingresa un correo valido"),
        Contraseña: z.string().min(6, "Contraseña debe tener minimo 6 palabras"),
        confirmPassword: z.string().min(6, "Contraseña debe tener minimo 6 palabras")
})
.refine((data) => data.Contraseña === data.confirmPassword, {
    message: "Contraseña debe coincidir"
})