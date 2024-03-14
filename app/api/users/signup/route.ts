import {NextRequest,NextResponse} from "next/server";
import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs"
//establish a connection
connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {fullName, username, email, password} = requestBody;
        console.log("REQUEST BODY",requestBody)
        //check if user exist
        const user = await User.findOne({username});
        if(user){
            return NextResponse.json({error:"User already Exists",status:400});
        }else{
        
            // generate hash password
        const salt = await bcrypt.genSalt(10);
        console.log("SALT",salt)
        const hashPassword = await bcrypt.hash(password,salt);
        console.log("HASHPASSWORD",hashPassword)
        //create user instance
                // create a new user
                const NEW_USER = new User({ fullName, username, email, password:hashPassword });
                const savedUser = await NEW_USER.save();
                console.log(savedUser)
                return NextResponse.json({ message: "Signup Successfully User Saved", success: true, savedUser });
              
        }
       
          
    } catch (error) {
        console.log("Signup Failed Try Again!!!");
        return NextResponse.json({message:"Sign Failed Server error",status:500})
    }
    
}
 