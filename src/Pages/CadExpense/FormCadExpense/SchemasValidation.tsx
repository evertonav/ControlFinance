import { z } from 'zod';

export const schemaCadExpense = z.object(
    {        
        description: z.string()
                        .nonempty("O campo deve ser preenchido.")
                        .min(3, 'Preencha no mínimo 3 caracteres.')
                        .max(60, 'Preencha no máximo 60 caracteres.'),

        value: z.string()
                .max(6, 'Preencha com o valor até 999999.')
                .regex(/^\d+$/, { message: "Somente números são permitidos" }), // Validação para garantir números                
    }
)

export type FormDataCadExpense = z.infer<typeof schemaCadExpense>