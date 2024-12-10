import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
  return NextResponse.json({message:"hellow world",success:true},{status:200}) ;
}

