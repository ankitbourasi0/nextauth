import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/app/models/userModel";
import jwt from "jsonwebtoken"
connect();
export async function POST(req:NextRequest){
    try {
        const requestBody = await req.json()
        const {username,password} = requestBody
        const user = await User.findOne({username}) 
        console.log(username,password)
        if(!user){
            return NextResponse.json({message:"User does not exist!!!",status:400})
        }
        //check user password and hash password 
          const validPassword =   await bcryptjs.compare(password,user.password)
        // if both are equal then create token 
            if(!validPassword){
            return NextResponse.json({message:"Username or password is wrong!!!",status:400})
                
            }

            //create token data
            const tokenData = {
                id:user._id,
                username:user.username,
                email:user.email
            }
            //create tokendata with secret token and with expiry
            const token = await jwt.sign(tokenData,process.env.MY_SECRET_TOKEN!,{expiresIn:"1h"});
            const response = NextResponse.json({message:"Login Successful",success:true})
            //set token in the cookies so that user cant manipulate it,
            response.cookies.set("token",token,{httpOnly:true});
            return response;

          } catch (error) {
        return NextResponse.json({message:"Login Unsuccessful, Check your request"})
        
    }
}