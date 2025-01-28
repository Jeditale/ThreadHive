"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";

export default function EditForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const router = useRouter()
    const [gender, setGender] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (!name || !email || !phone) {
            alert('กรุณากรอกข้อมูลให้ครบ')
            return
        }
        router.push('/profile')
    }

    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar/>
            <SideBar/>
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <div className="bg-[#FFF8DC] p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6 p-24 pt-10 pb-10">
                        <div className="flex flex-col items-center">
                            <img src="/assets/profile.png" className="w-36 h-36" />
                            <button className="bg-[#FAF3B8] hover:bg-[#EAC67A] rounded-2xl shadow-lg p-2 mt-5 mb-7">แก้ไขรูปโปรไฟล์</button>
                        </div>

                        <label >ชื่อผู้ใช้</label>
                        <div>
                            <input type="text" name="name" placeholder="ชื่อผู้ใช้"
                            className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>

                        <div className="flex space-x-4 items-center justify-center">
                            <div className="flex flex-col flex-grow">
                                <label >ชื่อ</label>
                                <input type="text" name="fname" placeholder="ชื่อ"
                                className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <label >นามสกุล</label>
                                <input type="text" name="lname" placeholder="นามสุล"
                                className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                        </div>

                        <label>เพศ</label>
                        <div>
                            <select name="gender" placeholder="เพศ"
                            className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                <option value="" disabled>เพศ</option>
                                <option value="male">ชาย</option>
                                <option value="female">หญิง</option>
                                <option value="other">อื่นๆ</option>
                            </select>
                        </div>

                        <div>
                            <label>วันเกิด</label>
                            <div className="flex space-x-4">
                                <select name="day" className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>วัน</option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select name="day" className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>เดือน</option>
                                    {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((month, index) => (
                                    <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                                <select name="day" className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>ปี</option>
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label >อีเมล</label>
                        <div>
                            <input type="text" name="email" placeholder="อีเมล"
                            className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>
                        <label >รหัสผ่าน</label>
                        <div>
                            <input type="text" name="password" placeholder="รหัสผ่าน"
                            className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>
                        <label >ยืนยันรหัสผ่าน</label>
                        <div>
                            <input type="text" name="confirmPassword" placeholder="รหัสผ่าน"
                            className="bg-white shadow-lg rounded-2xl w-full p-2 mt-1 mb-10"></input>
                        </div>

                        <div className="flex space-x-3 items-center justify-center">
                            <button className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">บันทึก</button>
                            <button className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">ยกเลิก</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
