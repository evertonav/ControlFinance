import { z } from 'zod'

export const schemaLogin = z.object(
    {
        email: z.string().email('Insira um email válido').nonempty("O campo e-mail é obrigatório."),
        password: z.string().nonempty("O campo senha é obrigatório.")
    }
)

export type FormDataLogin = z.infer<typeof schemaLogin>