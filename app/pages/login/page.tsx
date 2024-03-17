"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import react,{ useState } from "react"

function LoginPage() {
    const [user, setUser] = useState({
        username:"",
        password:""
    })
    const router = useRouter()
    const onLogin = async ()=>{
      
        try {

           const response = await axios.post("/api/users/login",user)
            console.log(response.data);
                         router.push("/pages/signup")
                    } catch (error: any) {
                        console.log("LOGIN FAILED ")
                    }
       
    }
    return (
        <div>

            <div >

                <label htmlFor="username">Username or Email </label>
                <input type="text" value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} name="username" id="username" />

                <label htmlFor="password">Password </label>
                <input type="password" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} name="password" id="password" />

                <button type="submit" onClick={onLogin}  >SUbmit        </button>
            </div>
        </div>
        );
}

export default LoginPage