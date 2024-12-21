import mongoose ,{Document} from "mongoose";   
import {TimeStamps} from "@/models/adminModel" ;
import { SubCategory } from "./SubCategoryModel";


export interface Cetegory extends Document , TimeStamps{
    ca_name:string,
    ca_des:string ,
    ca_image:string ,
    sub_category:SubCategory[]
}
const categoriesSchema = new mongoose.Schema<Cetegory>(
    {
        ca_name : {
            type : String ,
            required: true ,
            unique:true
        } ,
        ca_des: {
            type : String ,
            required: true ,
            unique:true
        } ,
        ca_image : {
            type : String ,
            required: true ,
        } ,
        sub_category : [{type:mongoose.Schema.Types.ObjectId , ref:"SubCategories"}]
    } , 
    {timestamps:true}
 
) ; 



export const categoryModel = mongoose.models.Category as mongoose.Model<Cetegory>  || mongoose.model<Cetegory>("Category",categoriesSchema) ;

