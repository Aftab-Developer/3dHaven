import mongoose ,{Schema,model,Document} from "mongoose" ; 
import { TimeStamps } from "./adminModel";  
import { Comments } from "./commentsModel";

export interface Blogs extends Document,TimeStamps{
  blog_title:string ,
  blog_des : string ,
  blog_image : string , 
  comments?:Comments[]
} 
 
export const blogSchema = new Schema<Blogs>({
    blog_title: {
        type:String ,
        required:true
    } , 
    blog_des: {
        type:String ,
        required:true
    } , 
    blog_image: {
        type:String ,
        required:false
    } , 
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Blogcomments"
        }
    ]

},{timestamps:true}) ;


export const blogModel = mongoose.models.Blogs as mongoose.Model<Blogs>
 || model<Blogs>("Blogs",blogSchema) ;




 