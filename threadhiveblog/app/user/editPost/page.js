"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';
import Swal from "sweetalert2";

async function getPost(id) {
    const response = await fetch(`https://678497a11ec630ca33a4d90c.mockapi.io/blog/${id}`);
    if (!response.ok) {
        throw new Error("cannot fetch");
    }
    return response.json();
}

export default function EditPost() {

    const { id } = useParams();
    
    const [post, setPost] = useState({
        title: '',
        description: '',
        userProfile: '',
        username: '',
        createdAt: '',
        image: '',
        likes: 0,
        comments: 0,
        shares: 0
    });
    
    useEffect(() => {
        if (id) {
            getPost(id)
                .then(result => setPost(result))
                .catch(error => console.error("error", error));
        }
    }, [id]);

    return(
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar/>
            <SideBar/>
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <p className="text-center text-xl mb-5 dark:text-white">แก้ไขโพสต์</p>
                    <div className="bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg rounded-2xl p-6 w-full h-min">

                        {/* โปรไฟล์ */}
                        <div className="flex items-center mb-2">
                            <img src={post.userProfile} alt="Profile" className="h-14 w-14 mr-2"></img>
                            <div>
                                <p className="font-semibold dark:text-white">{post.username}</p>
                                <p className="text-gray-500 text-sm dark:text-white">
                                    {new Date(post.createdAt).toLocaleDateString("th-TH", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* ข้อความ */}
                        <div>
                            <textarea name="title" placeholder="เพิ่มแท็ก" className="w-full p-3 border rounded-lg bg-white dark:bg-[#FEF7D8]" rows={1}></textarea>
                            <textarea placeholder="หัวข้อโพสต์" className="w-full p-3 mt-5 border rounded-lg bg-white dark:bg-[#FEF7D8]" rows={1}></textarea>
                            <textarea placeholder="ข้อความ" className="w-full p-3 mt-5 border rounded-md bg-white dark:bg-[#FEF7D8]" rows={4}></textarea>
                        </div>

                        {/* แสดงรูปภาพ */}
                        <div>
                            <img></img>
                        </div>

                        {/* ปุ่ม เพิ่ม/แก้ไข รูปภาพ */}
                        <div>
                            <button className="flex items-center space-x-2 text-[#D89614] cursor-pointer hover:text-[#B87C0D] mt-5">
                                <img src="/assets/addPhoto.png"  className="h-10 w-10"/>
                                <span>แก้ไขรูปภาพ</span></button>
                        </div>
                        {/* ปุ่ม แก้ไข ยกเลิก */}
                        <div className="flex space-x-3 items-center justify-center mt-5">
                            <Link href="/user" className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2"
                                onClick={() => {
                                    Swal.fire({
                                        title: "แกไขข้อมูลสำเร็จ!",
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
                            >แก้ไข</Link>
                            <Link href="/user" className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">ยกเลิก</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}