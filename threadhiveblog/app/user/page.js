"use client";

import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { useState, useEffect } from "react"
import Link from 'next/link';
import { redirect } from "next/navigation";

async function getPost(id) {
    const response = await fetch(`https://threadhive.onrender.com/posts/user/${id}`, {
        headers : {
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        }
    });
    if (!response.ok) {
        throw new Error("cannot fetch");
    }
    return response.json();
}

async function getUser(id) {
    const response = await fetch(`https://threadhive.onrender.com/users/${id}`,{
        headers : {
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        }
    })
    if (!response.ok) {
        throw new Error("cannot fetch");
    }
    return response.json();
}

function logout() {
    if (sessionStorage.getItem('userToken')) {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userToken')
        redirect('/home')
    }
    
}

export default function User() {
    const [post, setPost] = useState(null); 
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(sessionStorage.getItem("userId"));
                console.log(userData)
                setUser(userData)
                
            } catch (err) {
                setError(err.message);
            }
        
        }
        const fetchPost = async () => {
            try {
                const postData = await getPost(sessionStorage.getItem("userId")); 
                setPost(postData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
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
                                <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full border" />
                            </div>
                            <p className="text-xl font-semibold mb-5">{user.usrname}</p>
                            <div className="flex space-x-3">
                                <button className="bg-[#3A3000] text-white hover:bg-[#2A1C08] shadow-lg px-4 py-2 rounded-lg">แก้ไขโปรไฟล์</button>
                                <button className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-4 py-2 rounded-lg" onClick={logout}>ออกจากระบบ</button>
                            </div>
                            <button className="flex items-center bg-white text-black hover:bg-gray-200 shadow-lg px-4 py-2 rounded-lg mt-4">
                                <img src="/assets/newPost.png" alt="Home" className="w-6 h-6 mr-2" />
                                เขียนโพสต์
                            </button>
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
                            <img src={user.profilePicture} alt="Profile" className="w-12 h-12 rounded-full border" />
                            <div>
                                <p className="font-semibold mr-10">{user.usrname}</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString("th-TH", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center mt-4">
                                <button className="bg-[#3A3000] text-white hover:bg-[#2A1C08] shadow-lg px-4 py-1 mr-2 ml-96 rounded-2xl">แก้ไข</button>
                                <button className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-6 py-1 rounded-2xl">ลบ</button>
                            </div>
                        </div>

                        {/* ส่วนข้อความ */}
                        <Link href={`/home/user/${post.id}`}>
                            <div className="mb-5">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p className="text-gray-700">{post.details}</p>
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
