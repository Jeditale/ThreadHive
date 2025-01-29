"use client";

import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react"
import Link from 'next/link';
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

function logout() {
    if (sessionStorage.getItem('userToken')) {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userToken')
        redirect('/home')
    }
    
}

export default function User() {
    const [post, setPost] = useState([]); 
    const [user, setUser] = useState([])
    // const [loading, setLoading] = useState(true); 
    // const [error, setError] = useState(null); 

    const base64Pic = "data:image/png;base64,"

    useEffect(() => {
        async function getPost() {
            const userId = sessionStorage.getItem("userId")
            const response = await fetch(`https://threadhive.onrender.com/posts/user/${userId}`, {
                headers : {
                    'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
                }
            });
            if (!response.ok) {
                throw new Error("cannot fetch");
            }
            return response.json();
        }
        
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
            return response.json();
        }
        
    }, []);

    // if (loading) {
    //     return (
    //         <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen flex justify-center items-center">
    //             <p className="dark:text-white">กำลังโหลดข้อมูล...</p>
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen flex justify-center items-center">
    //             <p className="dark:text-white">เกิดข้อผิดพลาด: {error}</p>
    //         </div>
    //     );
    // }

    // if (!posts) {
    //     return (
    //         <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen flex justify-center items-center">
    //             <p className="dark:text-white">ไม่พบโพสต์</p>
    //         </div>
    //     );
    // }

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-7 mt-5">
                <div className="col-start-3 col-span-5">
                    {/* ส่วนของโปรไฟล์ */}
                    <div className="bg-[#FFF8DC] dark:bg-[#5b4e4a] rounded-lg p-5 shadow-lg w-full h-32 max-w-4xl mb-64">
                        <div className="flex flex-col items-center">
                            <div className="w-44 h-44 rounded-full mb-4">

                                <img src={base64Pic+(user.profilePicture)} alt="Profile" className="w-full h-full rounded-full" />
                            </div>
                            <p className="text-xl font-semibold mb-5 dark:text-white">{user.usrname}</p>
                            <div className="flex space-x-3">
                                <Link href="/user/editProfile" className="bg-[#3A3000] dark:bg-[#504b34] text-white hover:bg-[#2A1C08] dark:hover:bg-[#6e684c] shadow-lg px-4 py-2 rounded-lg">แก้ไขโปรไฟล์</Link>
                                <button className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-4 py-2 rounded-lg"
                                onClick={() => {
                                    Swal.fire({
                                        title: "คุณต้องการออกจากระบบใช่หรือไม่?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#3085d6",
                                        confirmButtonText: "ใช่",
                                        cancelButtonText: "ไม่ใช่",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            Swal.fire({
                                                title: "ออกจากระบบสำเร็จ!",
                                                text: "คุณได้ออกจากระบบแล้ว",
                                                icon: "success",
                                                confirmButtonColor: "#3085d6",
                                            });
                                            logout()
                                        }
                                    });
                                }}>ออกจากระบบ</button>

                            </div>
                            <Link href="/home/post" className="flex items-center bg-white dark:bg-[#FEF7D8] text-black hover:bg-gray-200 dark:hover:bg-[#ddd09a] shadow-lg px-4 py-2 rounded-lg mt-4">
                                <img src="/assets/newPost.png" alt="Home" className="w-6 h-6 mr-2" />
                                เขียนโพสต์
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="grid grid-cols-6 pt-5">
                <div className="col-start-3 col-span-3">

                <p className="text-lg pb-4 dark:text-white">โพสต์ทั้งหมด</p>

                    <div className="bg-[#FFF8DC] dark:bg-[#5b4e4a] p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">

                        {/*  ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                        <div className="relative flex items-center space-x-3 mb-3">
                            {/* รูปโปรไฟล์ */}
                            <img src={user.profilePicture} alt="Profile" className="w-12 h-12 rounded-full" />

                            {/* ชื่อและวันที่ */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold dark:text-white truncate">{user.usrname}</p>
                                <p className="text-gray-500 text-sm dark:text-white">
                                    {new Date(post.createdAt).toLocaleDateString("th-TH", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* ปุ่มแก้ไขและลบ */}
                            <div className="absolute top-0 right-0 flex space-x-2">
                                <Link href="/user/editPost" className="bg-[#3A3000] text-white hover:bg-[#2A1C08] shadow-lg px-4 py-1 rounded-2xl">
                                    แก้ไข
                                </Link>
                                <button
                                    className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-6 py-1 rounded-2xl"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "คุณแน่ใจหรือไม่?",
                                            text: "หากลบแล้วจะไม่สามารถกู้คืนโพสต์นี้ได้!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#3085d6",
                                            confirmButtonText: "ใช่",
                                            cancelButtonText: "ยกเลิก",
                                            customClass: {
                                                popup: "rounded-xl shadow-xl",
                                                confirmButton: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg",
                                                cancelButton: "bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg",
                                            },
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire({
                                                    title: "ลบโพสต์สำเร็จ!",
                                                    text: "โพสต์ของคุณถูกลบเรียบร้อยแล้ว",
                                                    icon: "success",
                                                    confirmButtonColor: "#3085d6",
                                                    confirmButtonText: "ตกลง",
                                                });
                                                // เพิ่มโค้ดสำหรับลบโพสต์ที่นี่
                                            }
                                        });
                                    }}
                                >
                                    ลบ
                                </button>
                            </div>
                        </div>
                        {/* ส่วนข้อความ */}
                        <Link href={`/home/user/${sessionStorage.getItem("userId")}`}>
                            <div className="mb-5">
                                <h3 className="font-bold text-lg dark:text-white">{post.title}</h3>
                                <p className="text-gray-700 dark:text-white">{post.details}</p>
                            </div>
                        </Link>

                        {/* ส่วนรูปภาพ */}
                        {post.image && (
                            <div className="mt-2">
                                <img src={post.image} alt="Post Image" className="w-full rounded-lg" />
                            </div>
                        )}

                        {/* ปุ่ม Like, Comment, Share */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-5 mt-4 text-gray-600 dark:text-black">
                                <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                    <span className="text-xl">
                                        <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-2" />
                                    </span>{post.likes ?? 0}ถูกใจ
                                </button>
                                <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                    <span className="text-xl">
                                        <img src="/assets/comment.png" alt="Home" className="w-6 h-6 mr-2" />
                                    </span>{post.comments ?? 0}ความคิดเห็น
                                </button>
                                <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                    <span className="text-xl">
                                        <img src="/assets/share.png" alt="Home" className="w-6 h-6 mr-2" />
                                    </span>{post.shares ?? 0}แชร์
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
