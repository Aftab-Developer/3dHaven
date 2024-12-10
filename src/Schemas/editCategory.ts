import {z} from "zod" ;
export const editCategorySchema = z.object(
    {
        ca_name : z.string({message:"username should be in char"})
        .min(5,"username must be at least 5 char")
        .max(20,"username must be 20 char long") ,
         ca_des : z.string({message:"username should be in char"})
         .min(13,"description should be 13 char long")
         .max(55,"description should be 55 char long")
         
    }
) ; 
