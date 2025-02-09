"use client"
import { redirect } from "next/navigation";
import Link from "next/link";
import { login } from "./action"
import { useActionState,useEffect, useState  } from "react"

export default function LoginPage() {

    const [user, formAction] = useActionState(login,null)
    const [userCheck, setUser] = useState(null)

    useEffect(() => {
        async function checkAdmin() {
            const token = sessionStorage.getItem('userId')
            const fetchUser = await fetch(`http://localhost:3000/users/${token}`,{
                headers : {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
            })

            if(!fetchUser.ok){
                throw new Error('cannot fetch')
            
            }
            const data = await fetchUser.json();
            setUser(data)

            if(data.isAdmin == true){
                redirect('/admin')
            } else {
                redirect('/home')
            }
        }

        function checkSession() {
            if (user && user.token) {
                sessionStorage.setItem('userId', user.userId);
                sessionStorage.setItem('userToken', user.token);
            }
        }
        checkSession()
        checkAdmin()


    }, [user]);

    
    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center " style={{ backgroundImage: "url('/assets/bg5.png') " }}>
            <form action={formAction} className="bg-white bg-opacity-40 p-6 rounded-2xl shadow-lg w-1/3 h-auto">

                <h2 className=" text-3xl text-center mb-16 mt-16">ลงชื่อเข้าใช้งาน</h2>

                <div className="mb-4">
                    <input type="text" name="email" placeholder="อีเมล" 
                        className="text-xl w-full p-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div className="mb-4">
                    <input type="password" name="password" placeholder="รหัสผ่าน" 
                        className="text-xl w-full p-2 mt-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <Link href="/register" className="text-yellow-950 text-xl mt-10 underline">สร้างบัญชีผู้ใช้งาน</Link>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="text-2xl w-auto bg-[#3A3000] text-white p-10 pt-2 pb-2 rounded-2xl hover:bg-black transition duration-300 mb-16 mt-16 ">เข้าสู่ระบบ</button>
                </div>

            </form>
        </div>
    )
}