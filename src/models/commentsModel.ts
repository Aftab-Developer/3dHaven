import mongoose ,{Schema,model,Document} from "mongoose" ; 
import { TimeStamps } from "./adminModel";  

export interface Comments extends Document,TimeStamps {
 name :string ,
 email: string ,
 description : string 
} 

export const commentsSchema = new Schema<Comments>({
    name:{
        type:String ,
        required:true
    } ,
    email:{
        type:String ,
        required:true
    } ,
    description:{
        type:String ,
        required:true
    } 
    
},{timestamps:true}) ;

export const commentsModel = mongoose.models.Comments as mongoose.Model<Comments>
 || model<Comments>("Comments",commentsSchema) ; 
