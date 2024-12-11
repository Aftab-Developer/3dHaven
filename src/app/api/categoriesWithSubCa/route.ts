import { categoryModel } from "@/models/allCategories";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        await dbConnect() ; 
        const {searchParams} = request.nextUrl ; 
        const categoryName = searchParams.get("categoryName"); 
        const decodeCategoryName = decodeURIComponent(categoryName as string) ; 

        const categoryWithSubCategory = await categoryModel
        .find({ca_name:decodeCategoryName})
        .populate("SubCategory")
        .exec() ; 
        if(!categoryWithSubCategory) return  NextResponse.json({message:"No category exsists",success:false},{status:400}) ; 

        return NextResponse.json({message:"here is  the category",categoryWithSubCategory,success:true},{status:200}) ;
        } catch (error) {
        console.log(`some error in category names ${error}`) ;
            
        }
}