"use client"

import react,{useState} from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from 'next/navigation'

function SignupPage(){
    const [user,setUser] = useState({
        fullName:"",
        username:"",
        email:"",
        password:""
    })
    const [loading,setLoading] = useState<boolean>();
    const navigator =useRouter()
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log(response.data);
//              navigator.push("/page/signup")
        } catch (error: any) {
            console.log("SIGNUP FAILED ")
        }finally {
            setLoading(false);
        }
    }
    return(
       <react.Fragment>
           <h1>Sign Up</h1>
           {loading?<p>Loading...</p>:""}

           <div className={"grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 lg:max-w-5xl md:max-w-4xl sm:mx-6  w-full mx-auto"}>
               <div className={"space-x-2"}>
                   <label htmlFor={"fullname"}>Fullname</label>
                   <input id="fullname"  type={"text"} placeholder={"Enter your fullname"} value={user.fullName}
                       onChange={(e)=>setUser({...user,fullName:e.target.value})}
                   /></div>
               <div className={"space-x-2"}>
                   <label htmlFor={"username"}>Username</label>
                   <input id="username"  type={"text"} placeholder={"Enter a unique username"}
                       value={user.username}
                       onChange={(e)=>setUser({...user,username:e.target.value})}
                   />
               </div>
               <div className={"space-x-2"}> <label htmlFor={"email"}>Email</label>
                   <input id="email"  type={"email"} placeholder={"Enter your email"}
                       value={user.email}
                       onChange={(e)=>setUser({...user,email:e.target.value})}
                   />
               </div>
               <div className={"space-x-2"}>
                  <label htmlFor={"password"}>Password</label>
                  <input id="password" type={"password"} placeholder={"Enter your password"}
                      value={user.password}
                      onChange={(e)=>setUser({...user,password:e.target.value})}
                  />
              </div>

               <button onClick={onSignUp}>Submit</button>
           </div>
           <Link href={"/pages/login"}>Already have account ? Login</Link>
           
       </react.Fragment>
    );
}
export default SignupPage;