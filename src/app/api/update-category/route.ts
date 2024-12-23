import { categoryModel } from "@/models/allCategories";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PACTH(request:NextRequest) {
    try {
        await dbConnect() ;
       const {searchParams} = request.nextUrl ;
               const categoryId = searchParams.get('categoryId') ;  
               if(!categoryId) return NextResponse.json({message:"please give category  id"},{status:400}) ; 
               const decodecategoryId = decodeURIComponent(categoryId as string) ; 

               const data = await request.formData(); 
               const ca_name = data.get('ca_name') as string  || null ;
               const ca_des = data.get('ca_des') as string  || null ;
               const ca_image = data.get('ca_image') as File || null ;   
               
               
        if(!ca_name || !ca_des ||  !ca_image) return NextResponse.json({message:"all field required"},{status:400}) ; 

       const category = await categoryModel.find({_id:decodecategoryId}) ;
       if(!category) return NextResponse.json({message:"No category find"},{status:400}) ;


       if(ca_name) category[0].ca_name = ca_name ; 
       if(ca_des) category[0].ca_des = ca_des ; 

       
              if(ca_image) {
                  const res:any = await cloudinaryUpload(ca_image , "AmmarAssest") ; 
                  category[0].ca_image = res.secure_url 
              } 
               
              await category[0].save() ; 

              return NextResponse.json({message:"category is updated"},{status:200}) ; 
      

    } catch (error) {
        console.log(`some error updating category ${error}`);
        
    }
}