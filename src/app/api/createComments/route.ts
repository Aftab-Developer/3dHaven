import { blogModel } from "@/models/blogModel";
import {  commentsModel } from "@/models/commentsModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        await dbConnect() ; 
        const data = await request.formData() ;
        const name = data.get("name") as string | null ;
        const email = data.get("email") as string | null ; 
        const description = data.get("description") as string | null ; 
        
        if(!name || !email || !description) return NextResponse.json({message:"ALl fields required",success:false},{status:400}) 
        
          const res =  await commentsModel.create(
                {
                    name ,
                    email ,
                    description 
                }
            ) ; 
             const id:any = res._id ;
             const blogModels = await blogModel.find({}).limit(1) ; 
             blogModels[0].comments?.push(id) ; 
             await blogModels[0].save() ; 

             return NextResponse.json({message:"comment is added ",success:true},{status:200}) ;
        

    } catch (error) {
        console.log(`error in creating blog ${error}`);
        
    }
}