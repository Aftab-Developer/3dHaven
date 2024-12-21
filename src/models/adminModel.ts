import mongoose from "mongoose";  
import {Document} from "mongoose" ; 

export interface TimeStamps {
    created_at : Date ,
    updated_at: Date
}

export interface Admin extends Document ,TimeStamps {
    ad_name : string ,
    ad_email: string ,
    ad_password:string ,
    ad_profile_img:string
} 

const adminSchema = new mongoose.Schema<Admin>(
    {
        ad_name : {
           type : String ,
           unique : true ,
           required : true
        } ,
        ad_email : {
            type : String ,
            unique : true ,
            required : true
        } , 
        ad_password: {
            type : String ,
            unique : true ,
            required : true
        } , 
        ad_profile_img :{
            type : String ,
    
        }
    } ,
    {timestamps:true}
) ; 

export const adminModel = mongoose.models.Admins as mongoose.Model<Admin>  || mongoose.model<Admin>("Admins",adminSchema) ;

