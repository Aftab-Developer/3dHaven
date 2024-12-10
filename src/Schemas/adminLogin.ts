import {z} from "zod" ;
export const adminLoginSchema = z.object(
    {
        ad_name : z.string({message:"username should be in char"})
        .min(5,"username must be at least 5 char")
        .max(20,"username must be 20 char long") ,
         ad_email : z.string()
         .min(13,"email should be 13 char long")
         .email({message:"please enter a valid email"}) ,
         ad_password: z.string({message:"username should be in char"})
         .min(5,"should be at least 5 digit")
         .max(15,"should be at least 15 digit")
         .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, "Password must include one lowercase and uppercase letter, one digit, and one special character")
    }
)