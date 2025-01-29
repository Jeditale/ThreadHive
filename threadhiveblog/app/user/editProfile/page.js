"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import Link from 'next/link';
import { useState,useEffect } from "react";
import Swal from "sweetalert2";

export default function EditForm() {

    const [user, setUser] = useState([])

    const base64Pic = "data:image/png;base64,"

    useEffect(() => {
        async function getUser() {
            const userId = sessionStorage.getItem("userId")
            const response = await fetch(`https://threadhive.onrender.com/users/${userId}`,{
                headers : {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
            })
            if (!response.ok) {
                throw new Error("cannot fetch");
            }
            const userData = await response.json();
            setUser(userData)
        }
        getUser()
        
    }, []);



    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar/>
            <SideBar/>
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <div className="bg-[#FFF8DC] dark:bg-[#5b4e4a] rounded-lg shadow-lg w-full max-w-4xl mb-6 p-24 pt-10 pb-10">
                        <div className="flex flex-col items-center">
                            <img src={base64Pic+user.profilePicture} className="w-36 h-36 rounded-full" />
                            <button className="bg-[#FAF3B8] dark:bg-[#FEF7D8] hover:bg-[#EAC67A] dark:hover:bg-[#ddd09a] rounded-2xl shadow-lg p-2 mt-5 mb-7">แก้ไขรูปโปรไฟล์</button>
                        </div>

                        <label className="dark:text-white">ชื่อผู้ใช้</label>
                        <div>
                            <input type="text" name="name" placeholder={user.usrname}
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>

                        <div className="flex space-x-4 items-center justify-center">
                            <div className="flex flex-col flex-grow">
                                <label className="dark:text-white">ชื่อ</label>
                                <input type="text" name="fname" placeholder={user.fname}
                                className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <label className="dark:text-white">นามสกุล</label>
                                <input type="text" name="lname" placeholder={user.lname}
                                className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                        </div>

                        <label className="dark:text-white">เพศ</label>
                        <div>
                            <select name="gender" placeholder="เพศ"
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                <option value="" disabled selected>{user.sex}</option>
                                <option value="male">ชาย</option>
                                <option value="female">หญิง</option>
                                <option value="other">อื่นๆ</option>
                            </select>
                        </div>

                        <div>
                            <label className="dark:text-white">วันเกิด</label>
                            <div className="flex space-x-4">
                                <select name="day" className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>วัน</option>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select name="day" className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>เดือน</option>
                                    {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'].map((month, index) => (
                                    <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                                <select name="day" className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                    <option value="" disabled selected>ปี</option>
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label className="dark:text-white">อีเมล</label>
                        <div>
                            <input type="text" name="email" placeholder="อีเมล"
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>
                        <label className="dark:text-white">รหัสผ่าน</label>
                        <div>
                            <input type="text" name="password" placeholder="รหัสผ่าน"
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>
                        <label className="dark:text-white">ยืนยันรหัสผ่าน</label>
                        <div>
                            <input type="text" name="confirmPassword" placeholder="รหัสผ่าน"
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-10"></input>
                        </div>

                        <div className="flex space-x-3 items-center justify-center">
                            <Link href="/user" className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2"
                            onClick={() => {
                                Swal.fire({
                                    title: "บันทึกข้อมูลสำเร็จ!",
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
                            >บันทึก</Link>
                            <Link href="/user" className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">ยกเลิก</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
