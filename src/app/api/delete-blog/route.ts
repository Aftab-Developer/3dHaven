import { blogModel } from "@/models/blogModel";
import { commentsModel } from "@/models/commentsModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect(); 
        const {searchParams} = request.nextUrl ; 
        const decodeBlogId = decodeURIComponent(searchParams.get('id')as string); 
        if(!decodeBlogId) {
            return NextResponse.json({message:"id is must"},{status:400}) ; 
        } 
        const isBlogPresent = await blogModel.find({_id:decodeBlogId}); 
        if(!isBlogPresent) {
            return NextResponse.json({message:"No blog found"},{status:400}) ; 

        } 

        const deleteBlog = await blogModel.deleteOne({_id:decodeBlogId}) ; 
        if(!deleteBlog) {
            return NextResponse.json({message:"Blog not deleted"},{status:400}) ; 

        } 
        isBlogPresent[0].comments?.forEach(async (id) => {
            await commentsModel.deleteMany({_id:id}) ;
        }); 

        return NextResponse.json({message:"Blog deleted"},{status:200}) ; 

    } catch (error) {
        console.log(`some error in deleting blog ${error}`);
        
    }
}