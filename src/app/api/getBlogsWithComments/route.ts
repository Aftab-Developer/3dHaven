import { blogModel } from "@/models/blogModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect() ; 
        const allBlogs = await blogModel.find({}) ;  

        if(!allBlogs) return NextResponse.json({message:"No blogs ..."},{status:400}) ;

        if(allBlogs[0].comments?.length == 0 ) {
            return NextResponse.json({message:"here is blogs ...",allBlogs},{status:200}) ;
        }  
        const allBlogsWithComments = await blogModel.find({})
       .populate('comments')
        .exec() ;

        return NextResponse.json({message:"here is blogs ...",allBlogsWithComments},{status:200}) ;
        
    } catch (error) {
        return NextResponse.json({message:"No blogs find ..."},{status:400}) ;

        
    }
}