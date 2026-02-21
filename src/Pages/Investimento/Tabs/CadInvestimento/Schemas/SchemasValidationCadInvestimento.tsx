import { z } from 'zod';

export const schemaCadInvestimento = z.object(
    {        
        title: z.string()
                  .nonempty("O campo deve ser preenchido.")
                  .min(3, 'Preencha no mínimo 3 caracteres.')
                  .max(60, 'Preencha no máximo 60 caracteres.'),

        value: z.string()
                .max(6, 'Preencha com o valor até 999999.')
                .regex(/^\d+$/, { message: "Somente números são permitidos" })
                .refine((val) => Number(val) > 0, {
                    message: 'O valor deve ser maior que zero'
                })              
    }
)

export type FormDataCadInvestimento = z.infer<typeof schemaCadInvestimento>