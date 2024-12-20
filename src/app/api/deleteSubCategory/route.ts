import { sub_categoryModel } from "@/models/SubCategoryModel";
import { dbConnect } from "@/utils/dbConnect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    try {
        await dbConnect() ; 
        const {searchParams} = await request.nextUrl ; 
        const decodeDeleteId = decodeURIComponent(searchParams.get("id") as string) ; 
        if(!decodeDeleteId) {
            return NextResponse.json({message:"id is must"},{status:400})
        } 
        const findSubcategory = await sub_categoryModel.find({_id:decodeDeleteId}); 
        if(!findSubcategory) {
            return NextResponse.json({message:"No result found"},{status:400})
        } 
        const isDeleteSubCategory = await sub_categoryModel.deleteOne({_id:decodeDeleteId}); 
        if(!isDeleteSubCategory) {
            return NextResponse.json({message:"Document not deleted"},{status:400})
        }  
        await mongoose.model('Category').updateOne(
            {sub_category :decodeDeleteId} ,
            {$pull: {sub_category:decodeDeleteId}}
        )
        return NextResponse.json({message:` ${findSubcategory[0].ca_name} sub-category deleted`},{status:200})
    } catch (error) {
        console.log(`error in dekeing sub categoey ${error}`);
        
    }
}