"use client"

import { login } from "./action"
import { useActionState } from "react"

export default function LoginPage() {

    const init = {
        

    }

    const [state, formAction] = useActionState(login,init)
    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.png')" }}>
            <form action={formAction} className="bg-white bg-opacity-40 p-6 rounded-2xl shadow-lg w-1/3 h-auto">

                <h2 className="text-white text-3xl text-center mb-20 mt-20">ลงชื่อเข้าใช้งาน</h2>

                <div className="mb-4">
                    <input type="text" name="email" placeholder="อีเมล" 
                        className="text-xl w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div className="mb-4">
                    <input type="password" name="password" placeholder="รหัสผ่าน" 
                        className="text-xl w-full p-3 mt-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="text-2xl w-auto bg-[#3A3000] text-white p-10 pt-3 pb-3 rounded-2xl hover:bg-black transition duration-300 mb-20 mt-20 ">เข้าสู่ระบบ</button>
                </div>

            </form>
        </div>
    )
}