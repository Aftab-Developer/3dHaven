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
        required:true
    } , 
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId ,
            ref:"Comments"
        }
    ]

},{timestamps:true}) ;

blogSchema.pre('deleteOne',{document:true , query:false},async function(next) {
   try {
         
    const commentsId = this.comments ; 
    if(commentsId && commentsId.length > 0) { 
      await mongoose.model('Comments').deleteMany({
          _id:{$in:commentsId}
      }) ; 
   
      await mongoose.model('Blogs').updateMany(
          {comments:{$in : commentsId}} , 
          {$pull : {comments:{$in:commentsId}}}
      ) ;
      next() ; 
       }
    } catch (err:any) {
         next(err); 
       }
      
}) ;

export const blogModel = mongoose.models.Blogs as mongoose.Model<Blogs>
 || model<Blogs>("Blogs",blogSchema) ;




 