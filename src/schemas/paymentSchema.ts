import { z } from "zod";

export const PaymentMethodSchema = z.object({
    id: z.coerce.number(),
    payment_method_name: z.string(),
    payment_method_desc: z.string(),
});

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;