"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import Link from 'next/link';
import { useState,useEffect,useActionState,startTransition } from "react";
import Swal from "sweetalert2";
import { editProfile } from "./action";

export default function EditForm() {

    const [user, setUser] = useState([])
    const [bdate, setBdate] = useState({ day: "", month: "", year: "" })
    const [gender, setGender] = useState("")
    const [state, formAction] = useActionState(editProfile,null)
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("userToken")

    const base64Pic = "data:image/png;base64,"

    useEffect(() => {
        async function getUser() {
            
            const response = await fetch(`http://localhost:3000/users/${userId}`,{
                headers : {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
            })
            if (!response.ok) {
                throw new Error("cannot fetch");
            }
            const userData = await response.json();
            transformDate(userData.bdate)
            setUser(userData)
            setGender(userData.sex)
        }

        const transformDate = (isoString) => {
            const date = new Date(isoString);
          
            setBdate({
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            });
          };

        getUser()
        
    }, []);

    const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            formData.append("userId", userId);
            formData.append("userToken", token);
    
            startTransition(() => {
                formAction(formData);
            });
        };

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar/>
            <SideBar/>
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <form action={formAction} className="bg-[#FFF8DC] dark:bg-[#5b4e4a] rounded-lg shadow-lg w-full max-w-4xl mb-6 p-24 pt-10 pb-10" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            <img src={(base64Pic+user.profilePicture) ?? "/assets/profile.png"} className="w-36 h-36 rounded-full" />
                            <button className="bg-[#FAF3B8] dark:bg-[#FEF7D8] hover:bg-[#EAC67A] dark:hover:bg-[#ddd09a] rounded-2xl shadow-lg p-2 mt-5 mb-7">แก้ไขรูปโปรไฟล์</button>
                        </div>

                        <label className="dark:text-white">ชื่อผู้ใช้</label>
                        <div>
                            <input type="text" name="username" placeholder="ชื่อผู้ใช้" value={user.usrname}
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                        </div>

                        <div className="flex space-x-4 items-center justify-center">
                            <div className="flex flex-col flex-grow">
                                <label className="dark:text-white">ชื่อ</label>
                                <input type="text" name="fname" placeholder="ชื่อ" value={user.fname}
                                className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <label className="dark:text-white">นามสกุล</label>
                                <input type="text" name="lname" placeholder="นามสกุล" value={user.lname}
                                className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"></input>
                            </div>
                        </div>

                        <label className="dark:text-white">เพศ</label>
                        <div>
                            <select name="gender" placeholder="เพศ" value={gender} onChange={(e) => setGender(e.target.value)}
                            className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3">
                                <option value="" disabled selected>เพศ</option>
                                <option value="male">ชาย</option>
                                <option value="female">หญิง</option>
                                <option value="other">อื่นๆ</option>
                            </select>
                        </div>

                        <div>
                            <label className="dark:text-white">วันเกิด</label>
                            <div className="flex space-x-4">
                                <select name="day" value={bdate.day} className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3" onChange={(e) => setBdate({ ...bdate, day: e.target.value })}>
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select name="month" value={bdate.month} className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"onChange={(e) => setBdate({ ...bdate, month: e.target.value })}>
                                    {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                                    .map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                                <select name="year" value={bdate.year} className="bg-white dark:bg-[#FEF7D8] shadow-lg rounded-2xl w-full p-2 mt-1 mb-3"onChange={(e) => setBdate({ ...bdate, year: e.target.value })}>
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label className="dark:text-white">อีเมล</label>
                        <div>
                            <input type="text" name="email" placeholder="อีเมล" value={user.email}
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
                            <button type="submit" className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2"
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
                            >บันทึก</button>
                            <Link href="/user" className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">ยกเลิก</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
