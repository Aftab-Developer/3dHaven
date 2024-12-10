import mongoose ,{Document} from "mongoose";   
import {TimeStamps} from "@/models/adminModel" ;

export interface SubCategory extends Document ,TimeStamps {
    ca_name:string ,
    ca_description:string ,
    ca_image:string ,
    ca_video:string,
    ca_videoFile:string
} 

const SubCategory_Schema = new mongoose.Schema<SubCategory>({
    ca_name:{
        type:String ,
        required:true,
        unique:true
    } ,
    ca_description:{
        type:String ,
        required:true,
        unique:true
    } ,
    ca_image:{
        type:String ,
        required:true
    } ,
    ca_video:{
        type:String ,
        required:true
    },
    ca_videoFile:{
        type:String ,
        required:true
    }
}) ;


export const sub_categoryModel = mongoose.models.SubCategory as mongoose.Model<SubCategory>  || mongoose.model<SubCategory>("SubCategory",SubCategory_Schema) ;
