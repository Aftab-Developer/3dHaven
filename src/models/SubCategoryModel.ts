import mongoose ,{Document} from "mongoose";   
import {TimeStamps} from "@/models/adminModel" ;

export interface SubCategory extends Document ,TimeStamps {
    ca_name:string ,
    ca_des:string ,
    ca_image:string , 
    ca_serve_image :string
    ca_video:string
} 

const SubCategory_Schema = new mongoose.Schema<SubCategory>({
    ca_name:{
        type:String ,
        required:true,
        unique:true
    } ,
    ca_des:{
        type:String ,
        required:true,
        unique:true
    } ,
    ca_image:{
        type:String ,
        required:true
    } ,
    ca_serve_image :{
        type:String ,
        
    },
    ca_video:{
        type:String ,
    },
    
},{timestamps:true}) ;


export const sub_categoryModel = mongoose.models.SubCategory as mongoose.Model<SubCategory>  || mongoose.model<SubCategory>("SubCategory",SubCategory_Schema) ;
