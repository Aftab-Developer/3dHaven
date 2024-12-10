import { adminModel } from "@/models/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(request:NextRequest) {
  try {
    await dbConnect() ; 
    const {ad_name ,ad_email,ad_password} = await request.json() ; 
    const findingAdmin = await adminModel.findOne({ad_email}) ; 
    if(!findingAdmin) {
        return NextResponse.json({message:"invalid credentials ..." ,success:false},{status:400}) ;
    }  
     
    const isPassRight = await bcrypt.compare(ad_password,findingAdmin?.ad_password as string);  
    if(!isPassRight){
        return NextResponse.json({message:"invalid credentials ..." ,success:false},{status:400}) ;
    } 
    return NextResponse.json({message:`Wellcome ${ad_name} to Dashboard...`,success:true},{status:200}) ;


  } catch (error) {
    console.log(`some error in logging the admin ?? ${error}`)
  }
}