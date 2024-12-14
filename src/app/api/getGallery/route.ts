import { blogModel } from "@/models/blogModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect() ;
        const blogs = await blogModel.find({}).exec() ; 
        if(!blogs) {
            return NextResponse.json({message:"No blogs to show ...",success:false},{status:400}) 
        };  
         
        return NextResponse.json({message:"here is all blogs show ...",blogs,success:true},{status:200}) ;
          
        
    } catch (error) {
        console.log(`error in creating blog ${error}`);
        
    }
}