import { blogModel } from "@/models/blogModel";
import { commentsModel } from "@/models/commentsModel";
import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {searchParams} = request.nextUrl ; 
        const decodeCommId = decodeURIComponent(searchParams.get('commentId') as string) ;  
        const decodeBlogId = decodeURIComponent(searchParams.get('blogId') as string) ; 

        if(!decodeCommId || !decodeBlogId) {
            return NextResponse.json({message:"all Id is required"},{status:400}) ; 
        } 
        const findComment = await commentsModel.find({_id:decodeCommId}) ; 
        if(!findComment) {
            return NextResponse.json({message:"No comment found"},{status:400}) ; 

        } 
        const isDeleted = await commentsModel.deleteOne({_id:decodeCommId}) ; 
        if(!isDeleted) {
            return NextResponse.json({message:"Not deleted"},{status:400})
        } 
        
        await blogModel.updateOne(
            {_id:decodeBlogId} , 
            {$pull:{comments:decodeCommId}}
        ) 

return NextResponse.json({message:"Comment deleted"},{status:200})
    } catch (error) {
        console.log(`some error deleting ${error}`);
        
    }
}