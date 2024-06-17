import {z} from "zod"

export const verifySceham = z.object({
    code: z.string().length(6,"Verification code must be of 6 Digits")
})