import { commentsModel } from "@/models/commentsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const {searchParams} = request.nextUrl ; 
        const id = searchParams.get("id") ;
        if(!id) return NextResponse.json({message:"id is needed",success:false},{status:400}) ;
        const decodeId = decodeURIComponent(id as string) ; 
       const isHasComments = await commentsModel.find({_id:decodeId}) ; 
       if(!isHasComments)  NextResponse.json({message:"no comments found",success:false},{status:400}) ; 
       NextResponse.json({message:"here is all comments ",isHasComments,success:true},{status:200}) ;
    } catch (error) {
        console.log(`error getting comments ${error}`);
        
    }
}