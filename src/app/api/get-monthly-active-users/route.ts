import { daily_active_users_model } from "@/models/dailyActiveUsers";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect() ; 
       const allInfo = await daily_active_users_model.find({}) ; 
         if(!allInfo) return NextResponse.json({message:"No users"},{status:400});  

         const mau_details =  await daily_active_users_model.aggregate([
            {$match: {}} ,
            {$group : {
                _id : "$month" ,
                monthly_active_users : {$push:"$$ROOT"}
            }}
         ]) ; 
         return NextResponse.json({message:"here is all MAU users",data:mau_details[0].monthly_active_users},{status:200});
    } catch (error) {
        console.log(`error in getting MAU info,${error}`);
        
    }
}