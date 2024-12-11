import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { adminModel } from "@/models/adminModel";
import { dbConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions = {
    providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
        ad_name: { label: "Username", type: "text", placeholder: "uername" },
        ad_email: { label: "Email", type: "email", placeholder: "email" },
        ad_password: { label: "Password", type: "password" }
    },
    async authorize(credentials:any):Promise<any> {
      const user = await adminModel.find({ad_email:credentials?.ad_email}) ; 
      if(user){
        return user
      } else {
         return null ;
      }
    } ,
    
  }), 
  
  
]
} ;