import { categoryModel } from "@/models/allCategories";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest) {
    try {
        await dbConnect() ;  
        const data = await request.formData() ; 
        const ca_name = data.get('ca_name');
        const ca_des = data.get('ca_des');
        const image_file = data.get('file') as File || null  ;  

         if(!ca_name || !ca_des || !image_file) return NextResponse.json({message:"All fields are required",success:false},{status:400}) ;  
     const res:any =   await cloudinaryUpload(image_file,"AmmarAssest") ; 
        const url = res?.secure_url ;
       await categoryModel.create({
        ca_name ,
        ca_des ,
        ca_image :url
       }) ; 
       return NextResponse.json({message:"Category Created ...",success:true},{status:200}) ;
      

    } catch (error) {
        console.log(`error in creating category ${error}`);
          
    }
 } 