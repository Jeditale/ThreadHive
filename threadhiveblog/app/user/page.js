"use client";

import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect, use } from "react"
import Link from 'next/link';
import Swal from "sweetalert2";

async function getPost(id) {
    const response = await fetch(`https://678497a11ec630ca33a4d90c.mockapi.io/blog/${id}`);
    if (!response.ok) {
        throw new Error("cannot fetch");
    }
    return response.json();
}

export default function User() {
    const [post, setPost] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getPost(1); 
                setPost(postData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#FAF3B8] min-h-screen flex justify-center items-center">
                <p>กำลังโหลดข้อมูล...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#FAF3B8] min-h-screen flex justify-center items-center">
                <p>เกิดข้อผิดพลาด: {error}</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-[#FAF3B8] min-h-screen flex justify-center items-center">
                <p>ไม่พบโพสต์</p>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-7 mt-5">
                <div className="col-start-3 col-span-5">
                    {/* ส่วนของโปรไฟล์ */}
                    <div className="bg-[#FFF8DC] rounded-lg p-5 shadow-lg w-full h-32 max-w-4xl mb-64">
                        <div className="flex flex-col items-center">
                            <div className="w-44 h-44 rounded-full mb-4">
                                <img src={post.userProfile} alt="Profile" className="w-full h-full rounded-full border" />
                            </div>
                            <p className="text-xl font-semibold mb-5">{post.username}</p>
                            <div className="flex space-x-3">
                                <Link href="/user/editProfile" className="bg-[#3A3000] text-white hover:bg-[#2A1C08] shadow-lg px-4 py-2 rounded-lg">แก้ไขโปรไฟล์</Link>
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
                                            // เพิ่มโค้ดสำหรับออกจากระบบที่นี่
                                        }
                                    });
                                }}>ออกจากระบบ</button>
                            </div>
                            <Link href="/home/post" className="flex items-center bg-white text-black hover:bg-gray-200 shadow-lg px-4 py-2 rounded-lg mt-4">
                                <img src="/assets/newPost.png" alt="Home" className="w-6 h-6 mr-2" />
                                เขียนโพสต์
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="grid grid-cols-6 pt-5">
                <div className="col-start-3 col-span-3">

                <p className="text-lg pb-4">โพสต์ทั้งหมด</p>

                    <div className="bg-[#FFF8DC] p-6 rounded-lg shadow-lg w-full max-w-4xl mb-6">

                        {/*  ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                        <div className="flex items-center space-x-3 mb-3">
                            <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full border" />
                            <div>
                                <p className="font-semibold mr-10">{post.username}</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString("th-TH", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <Link href="/user/editPost" className="bg-[#3A3000] text-white hover:bg-[#2A1C08] shadow-lg px-4 py-1 mr-2 ml-96 rounded-2xl">แก้ไข</Link>
                                <button className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-6 py-1 rounded-2xl"
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
                                            popup: 'rounded-xl shadow-xl', // ปรับแต่งขอบและเงา
                                            confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg',
                                            cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg'
                                        }
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
                                }}>ลบ</button>
                            </div>
                        </div>

                        {/* ส่วนข้อความ */}
                        <Link href={`/home/user/${post.id}`}>
                            <div className="mb-5">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p className="text-gray-700">{post.description}</p>
                            </div>
                        </Link>

                        {/* ส่วนรูปภาพ */}
                        {post.image && (
                            <div className="mt-2">
                                <img src={post.image} alt="Post Image" className="w-full rounded-lg border" />
                            </div>
                        )}

                        {/* ปุ่ม Like, Comment, Share */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-5 mt-4 text-gray-600">
                                <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
                                    <span className="text-xl">
                                        <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-2" />
                                    </span>{post.likes ?? 0}ถูกใจ
                                </button>
                                <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
                                    <span className="text-xl">
                                        <img src="/assets/comment.png" alt="Home" className="w-6 h-6 mr-2" />
                                    </span>{post.comments ?? 0}ความคิดเห็น
                                </button>
                                <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
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
