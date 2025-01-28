"use client"

import { register } from "./action"
import { useActionState } from "react"
import Link from "next/link"
import Swal from "sweetalert2"

export default function RegisterPage() {

    const init = {

    }

    const [state, formAction] = useActionState(register,init)
    return (
        <div className="flex min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg5.png')" }}>
            <form action={formAction} className="bg-white bg-opacity-40 p-6 rounded-2xl shadow-lg w-1/3 h-1/2">

                <h2 className=" text-3xl text-center mb-10 mt-5">สร้างบัญชีผู้ใช้งาน</h2>

                <div>
                    <input type="text" name="username" placeholder="ชื่อผู้ใช้งาน" 
                    className="text-base w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <div className="flex space-x-4">
                        <div className="flex-grow">
                            <input type="text" name="fname" placeholder="ชื่อ" 
                            className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                        </div>

                        <div className="flex-grow">
                            <input type="text" name="lname" placeholder="นามสกุล" 
                            className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                        </div>
                    </div>
                </div>

                <div>
                    <select type="text" name="gender" placeholder="เพศ" 
                    className="text-base w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                    <option value="" disabled selected>เพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="other">อื่นๆ</option>
                    </select>
                </div>

                <div>
                    <label className="text-base">วันเกิด</label>
                    <div className="flex space-x-4">
                        <select name="day" className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>วัน</option>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select name="day" className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>เดือน</option>
                            {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <select name="day" className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none">
                            <option value="" disabled selected>ปี</option>
                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <input type="text" name="email" placeholder="อีเมล" 
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <input type="password" placeholder="รหัสผ่าน" 
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div>
                    <input type="password" name="password" placeholder="ยืนยันรหัสผ่าน" 
                    className="text-base  w-full p-1 pl-3 mb-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#3A3000] focus:outline-none"/>
                </div>

                <div className="flex justify-center">
                    <Link href="/login" className="w-auto bg-[#3A3000] text-white text-xl p-10 pt-2 pb-2 rounded-2xl hover:bg-black transition duration-300 mb-10 mt-10 "
                        onClick={() => {
                            Swal.fire({
                                title: "สร้างบัญชีผู้ใช้สำเร็จสำเร็จ!",
                                text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "ตกลง",
                                customClass: {
                                popup: 'rounded-xl shadow-xl', 
                                confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
                                }
                            });
                        }}
                    >สมัครสมาชิก</Link>
                </div>
                
            </form>
        </div>
    )
}