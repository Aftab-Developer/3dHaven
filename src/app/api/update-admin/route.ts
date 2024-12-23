import { adminModel } from "@/models/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
export async function PATCH(request:NextRequest) {
  try {
    await dbConnect() ; 
    
    const data = await request.formData() ; 
    const ad_name = data.get("ad_name") as string | null ;
    const ad_email = data.get("ad_email") as string | null ; 
    const ad_password = data.get("ad_password") as string | null ; 
    const ad_profile_img = data.get("ad_profile_img") as File  ; 


    const adminDocument = await adminModel.find({}) ; 
    if(!adminDocument) return NextResponse.json({message:"No admin ...",success:false},{status:400}) ;  

    if(ad_name) adminDocument[0].ad_name = ad_name ;

    if(ad_profile_img){ 
      const url:any = await cloudinaryUpload(ad_profile_img,"AmmarAssest") ; 
       adminDocument[0].ad_profile_img = url.secure_url ;
      }; 

    if(ad_email) adminDocument[0].ad_email = ad_email ;

    if(ad_password){ 
      const newHashedPass = await bcrypt.hash(ad_password,10) ; 
       adminDocument[0].ad_password = newHashedPass ; 
    }

    adminDocument[0].save() ; 
    return NextResponse.json({message:"Admin profile updated ...",success:true},{status:200}) ;
        
  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`);
    
  }
}