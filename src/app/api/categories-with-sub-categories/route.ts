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
        .find({ca_name:decodeCategoryName}) ;
       
        if(!categoryWithSubCategory){ return  NextResponse.json({message:"No category exsists",success:false},{status:400}) ; }
         
        if(categoryWithSubCategory[0].sub_category.length == 0){
             return  NextResponse.json({message:"Here is all category",categoryWithSubCategory,success:true},{status:400}) ; }

        const categoryWithSubCategoryPopulate = await categoryModel
        .find({ca_name:decodeCategoryName}).populate('sub_category');

        return NextResponse.json({message:"here is  the category",categoryWithSubCategoryPopulate,success:true},{status:200}) ;
        } catch (error) {
        console.log(`some error in category names ${error}`) ;
            
        }
}