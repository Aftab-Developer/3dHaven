"use client"

import { useState } from "react";

export default function Home() {  
  const [data,setData] = useState<any>({
    ca_name : "" ,
    ca_des : "" ,
    ca_image : ""
  }) 
  const submitHandler = async() => {
     try {

      const formData = new FormData() ; 
      formData.append('ca_name',data.ca_name) ;
      formData.append('ca_des',data.ca_des) ;
      formData.append('file',data.ca_image) ; 
       
      const response = await fetch("/api/createCategory",{  
        method : "POST" ,
        body:formData  
        
      }) ; 
      const jsonData = await response.json() ; 
      console.log(jsonData);
      

     } catch (error) {
      console.error("some frontend error");
      
     }
  }
 
  return (
  <h1>
    hellow world
  </h1>
  );
}
