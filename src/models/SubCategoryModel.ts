import mongoose ,{Document} from "mongoose";   
import {TimeStamps} from "@/models/adminModel" ;

export interface SubCategory extends Document ,TimeStamps {
    ca_name:string ,
    ca_des:string ,
    ca_image:string ,  
    downloads : number
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
    downloads : {
      type: Number ,
      required : false ,
      default : 0
    } ,
    ca_serve_image :{
        type:String ,
        
    },
    ca_video:{
        type:String ,
    },
    
},{timestamps:true}) ;


export const sub_categoryModel = mongoose.models.SubCategories as mongoose.Model<SubCategory>  || mongoose.model<SubCategory>("SubCategories",SubCategory_Schema) ;
