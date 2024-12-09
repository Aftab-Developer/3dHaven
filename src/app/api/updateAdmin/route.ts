import { adminModel } from "@/models/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
  try {
    await dbConnect() ; 
    const {ad_name,ad_profile_img,ad_email} = await request.json() ;  
    const adminDocument = await adminModel.find({}) ;
    if(!adminDocument) return NextResponse.json({message:"No admin ...",success:false},{status:400}) ;  
    if(ad_name) adminDocument[0].ad_name = ad_name ;
    if(ad_profile_img) adminDocument[0].ad_profile_img = ad_profile_img; 
    if(ad_email) adminDocument[0].ad_email = ad_email ;
    adminDocument[0].save() ; 
    return NextResponse.json({message:"Admin profile updated ...",success:true},{status:200}) ;
        
  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`);
    
  }
}