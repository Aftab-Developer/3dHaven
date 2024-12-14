import { v2 as cloudinary } from 'cloudinary';

    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRECT 
    });     

    export const cloudinaryUpload = async(file:File,folder:string) => {
    const buffer = await file.arrayBuffer() ;  
    const bufferData =  Buffer.from(buffer) ; 
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({
            resource_type:"auto" ,
            folder:folder
        },async (error,result) => {
            if(error) return reject(error) ;
            return resolve(result) ;
        }
    ).end(bufferData)
    })


    }

  