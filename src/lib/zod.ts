import { z } from 'zod'

export const formulario = z.object({
    Correo: z.string().email(),
        Contraseña: z.string().min(6, "Contraseña debe tener minimo 6 palabras"),
    
})