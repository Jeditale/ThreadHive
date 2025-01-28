"use client"

import { redirect } from "next/navigation"
import { register } from "./action"
import { useActionState, useState } from "react"

export default function RegisterPage() {

    const [pass, setPass] = useState('')
    const [conPass, setConPass] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        fname: '',
        lname: '',
        gender: '',
        day: '',
        month: '',
        year: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    function initRegister() {
        setFormData({
            username: '',
            fname: '',
            lname: '',
            gender: '',
            day: '',
            month: '',
            year: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setPass('');
        setConPass('');
    }

    const init = async () => {
        initRegister()
    }

    
    function checkPass() {
        if (conPass == pass){
            redirect('/login')
        }

        alert("Invalid Password")
        initRegister();
        console.log(formData)
        
    }

    const [state, formAction] = useActionState(register,init)
    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg.png')" }}>
            <form action={formAction} className="bg-white bg-opacity-40 p-6 rounded-2xl shadow-lg w-1/3 h-1/2">

                <h2 className="text-white text-3xl text-center mb-10 mt-5">สมัครบัญชีผู้ใช้งาน</h2>

                <div>
                    <input type="text" name="username" placeholder="ชื่อผู้ใช้งาน" defaultValue={formData.username}
                    className="text-base w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <div className="flex space-x-4">
                        <div className="flex-grow">
                            <input type="text" name="fname" placeholder="ชื่อ" defaultValue={formData.fname}
                            className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                        </div>

                        <div className="flex-grow">
                            <input type="text" name="lname" placeholder="นามสกุล" defaultValue={formData.lname}
                            className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                        </div>
                    </div>
                </div>

                <div>
                    <select type="text" name="gender" placeholder="เพศ" defaultValue={formData.gender}
                    className="text-base w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                    <option value="" disabled selected>เพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="other">อื่นๆ</option>
                    </select>
                </div>

                <div>
                    <label className="text-base text-white underline decoration-white">วันเกิด</label>
                    <div className="flex space-x-4">
                        <select name="day" defaultValue={formData.day} className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>วัน</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select name="month" defaultValue={formData.month} className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>เดือน</option>
                            {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <select name="year" defaultValue={formData.year} className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>ปี</option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>

                <div>
                    <input type="text" name="email" placeholder="อีเมล" defaultValue={formData.email}
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <input type="password" name="password" placeholder="รหัสผ่าน" onChange={(e) => setPass(e.target.value)} defaultValue={formData.password} 
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <input type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" onChange={(e) => setConPass(e.target.value)} defaultValue={formData.confirmPassword}
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div className="flex justify-center">
                    <button className="w-auto bg-[#3A3000] text-white text-xl p-10 pt-2 pb-2 rounded-2xl hover:bg-black transition duration-300 mb-10 mt-10 " onClick={checkPass}>สมัครสมาชิก</button>
                </div>
                
            </form>
        </div>
    )
}