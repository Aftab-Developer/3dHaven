import { daily_active_users_model } from "@/models/dailyActiveUsers";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
         await dbConnect() ; 
               const allInfo = await daily_active_users_model.find({}) ; 
                 if(!allInfo) return NextResponse.json({message:"No users"},{status:400}); 
                 return NextResponse.json({message:"Here is DAU information ... ",allInfo},{status:200});
    } catch (error) {
        
    }
}