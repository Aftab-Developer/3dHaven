import { categoryModel } from "@/models/allCategories";
import { sub_categoryModel } from "@/models/SubCategoryModel";
import { cloudinaryUpload } from "@/utils/cloudinaryUpload";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try { 
        await dbConnect() ;  
        const {searchParams} = request.nextUrl ;
        const categoryName = searchParams.get("category-name"); 
        const decodeCategoryName = decodeURIComponent(categoryName as string) ;
        const data:any = await request.formData() ; 
        const ca_name = data.get("ca_name") ;  
        const ca_des = data.get("ca_des");  
        const ca_image = data.get("ca_image") as File|null ;  
        const ca_serve_image = data.get("ca_serve_image") ;  
        const ca_serve_video = data.get("ca_video") ; 

        const categoryExsists = await categoryModel.find
        ({ca_name:decodeCategoryName}) ; 

        if(!categoryExsists) return NextResponse.json({message:"No category find with this name",success:false},{status:400}) ;

        if(!ca_name || !ca_des || !ca_image) return NextResponse.json({message:"please enter all required fields",success:false},{status:400}) ; 


       
        if (ca_serve_image && ca_serve_video)return NextResponse.json({message:"please enter one serve img or video file 2",success:false},{status:400}) ; 



        let imageUrlForCa:string ;   
        let imageUrlForServe:string ;   
        let videoUrlForServe:string ;   
 
        const res:any = await cloudinaryUpload(ca_image,"AmmarAssest") ; 
         imageUrlForCa = res.secure_url ; 
 
         if(ca_serve_image && !ca_serve_video) {
            const res:any = await cloudinaryUpload(ca_serve_image,"AmmarAssest") ; 
            imageUrlForServe = res.secure_url ;   
            const doc = await sub_categoryModel.create({
                ca_name ,
                ca_des ,
                ca_image : imageUrlForCa ,
                ca_serve_image : imageUrlForServe , 
            }) ;   
            const id:any = doc?._id ;
            categoryExsists[0].sub_category.push(id) ; 
            await categoryExsists[0].save() ;

            return NextResponse.json({message:`A Subcategory careted with name ${ca_name}`,success:true},{status:200}) ;

         }  

         if(ca_serve_video && !ca_serve_image) {
            const res:any = await cloudinaryUpload(ca_serve_video,"AmmarAssest") ; 
            videoUrlForServe = res.secure_url ;  
            console.log(videoUrlForServe) ;
           const doc =  await sub_categoryModel.create({
                ca_name ,
                ca_des ,
                ca_image : imageUrlForCa ,
                ca_video : videoUrlForServe , 
            }) ;  
              const id:any = doc?._id ;
            categoryExsists[0].sub_category.push(id) ; 
            await categoryExsists[0].save() ;

            return NextResponse.json({message:`A Subcategory careted with name ${ca_name}`,success:true},{status:200}) ;

         }   

  
    } catch (error:any) {
        console.log(`error in creating sub category ${error}`);
        
    }
}