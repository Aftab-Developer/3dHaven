import {z} from "zod" ; 

export const contactSchema = z.object({
    username:z.string({message:"username should be in char"})
    .min(5,"username should be 5 char")
    .max(20,"username should be 20 char") ,
    email: z.string()
    .min(13,"email should be 13 char long")
    .email({message:"please enter a valid email"}) , 
    description:z.string({message:"description should be in char"})
    .min(25,"descripton should be 25 char")
    .max(50,"description should be 50 char")
}) ;