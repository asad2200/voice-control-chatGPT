'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"


function Login() {
  return (
    <div className="px-2 bg-[#11A37f] h-screen flex flex-col items-center justify-center">
        {/* TODO: Add IMAGE HERE */}
        
        <button onClick={() => signIn("google")} className="font-bold text-3xl animate-pulse">
            Sign In To Use Voice Control ChatGPT
        </button>
    </div>
  )
}

export default Login