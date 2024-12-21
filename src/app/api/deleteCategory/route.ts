import { categoryModel } from "@/models/allCategories";
import { sub_categoryModel } from "@/models/SubCategoryModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {searchParams} = request.nextUrl ;
        const decodeCategoryId = decodeURIComponent(searchParams.get('id') as string) ; 
        if(!decodeCategoryId) {
             return NextResponse.json({message:"id is must"},{status:400})
        } 
        const isCategoryExsists = await categoryModel.find({_id:decodeCategoryId}) ; 
        if(!isCategoryExsists) {
            return NextResponse.json({message:"No result found"},{status:400})
        }  
         
       const isCategoryDeleted = await categoryModel.deleteOne({_id:decodeCategoryId}) ;   

       if(!isCategoryDeleted) {
        return NextResponse.json({message:"Document not deleted"},{status:400})
       } 
        
       isCategoryExsists[0].sub_category.forEach(async (e) => {
         await sub_categoryModel.deleteMany({_id:e._id}) ;
       })

       return NextResponse.json({message:`${isCategoryExsists[0].ca_name }is deleted `},{status:400})

    } catch (error) {
        console.log(`some errror in deleting category ${error}`);
        
    }
}