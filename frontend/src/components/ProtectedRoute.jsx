import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useEffect, useState } from "react"

export default function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    },[])

    // auth akan dijalankan pertama kali
    // jika memiliki token dan token belum expired
    // maka akan mengembalikan true dan diberikan akses
    // jika tidak memiliki token atau token sudah expired
    // refreshToken akan dijalankan
    // jika masih tidak memiliki token atau token refresh tidak valid
    // maka akan diarahkan ke halaman login

    const refreshToken = async ()=>{
        // 1. check apakah ada token refresh di local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            // 2. jika ada, kirim token refresh ke server
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            // 3. jika server merespon dengan status 200
            if(res.status===200){
                // 4. simpan token baru ke local storage
                const token = res.data.access
                localStorage.setItem(ACCESS_TOKEN, token)
            }else{
                setIsAuthorized(false)
            }

        }catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () =>{
        // check token apakah sudah expired atau belum
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return
        }

        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now()/1000

        if(tokenExpiration< now){
            await refreshToken()
        }else{
            setIsAuthorized(true)
        }
    }

    if(isAuthorized === null){
        return <div>...loading</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}