import { daily_active_users_model } from "@/models/dailyActiveUsers";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    await dbConnect() ;
    const {uid} = await request.json() ; 
    if(!uid) return NextResponse.json({message:"All fields required"},{status:400}) ;  
    const monthName = new Date().toLocaleDateString('default',{month:'long'}) ;
    const details = new daily_active_users_model({
        uid ,
        month: monthName , 
        day: new Date().getDay()
    }) ; 
    await details.save() ; 
    return NextResponse.json({message:"One entry added"},{status:200}) ; 
    
  } catch (error) {
    console.log(`some error in storing DAU ${error}`);
    
  }
}