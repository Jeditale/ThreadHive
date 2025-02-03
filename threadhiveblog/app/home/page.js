"use client"

import NavBar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import Link from "next/link"
import ThemeToggle from "../components/ThemeToggle"
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation"
// import { countLikes } from "./action"

export default  function Posts(){

    const [posts, setPosts] = useState([])
    const base64Pic = "data:image/png;base64,"

    useEffect(() => {
        async function getPosts() {
            const token = sessionStorage.getItem("userToken");
        
            try {
                const response = await fetch("http://localhost:3000/posts", { method: "GET" });
                if (!response.ok) {
                    throw new Error("Cannot fetch posts");
                }
                const data = await response.json();

                const addData = await Promise.all(
                    data.map(async (post) => {
                        try {
                            console.log(`Fetching data for userId: ${post.userId}`);
                            const [likeRes, userRes] = await Promise.all([
                                fetch(`http://localhost:3000/post-likes/count/${post.id}`),
                                fetch(`http://localhost:3000/users/${post.userId}`)
                            ]);
    
                            const likeCount = likeRes.ok ? await likeRes.json() : { upvoteCount: 0 };
                            const userShow = userRes.ok ? await userRes.json() : {
                                profilePicture: '',
                                usrname: "Unknown user"
                            };
    
                            return {
                                ...post,
                                likeCount: likeCount.upvoteCount ?? 0,
                                username: userShow.usrname ?? "Unknown user",
                                profilePicture: userShow.profilePicture ?? ''
                            };
    
                        } catch (error) {
                            console.error("Error fetching like/user data:", error);
                            return {
                                ...post,
                                likeCount: 0,
                                username: "Unknown user",
                                profilePicture: ''
                            };
                        }
                    })
                );
    
                setPosts(addData);
    
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    
        getPosts();
    }, []);

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A]">
           <NavBar/>
           <SideBar/>
            <div>
                <div className="grid grid-cols-6 mt-5" >
                    {/* โพสต์แต่ละโพสต์ */}
                    <div className="col-start-3 col-span-3 w-auto">
                        <div>
                            {posts.map((post, index) => (
                                <div key={index} className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg w-auto">

                                    {/*  ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                                    <div className="flex items-center space-x-3 mb-3">
                                        <img src={post.profilePicture ? base64Pic + post.profilePicture : "/assets/jyn.png"} alt="Profile" className="w-12 h-12 rounded-full border" />
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

                                    {/* ส่วนข้อความ */}
                                    <Link href={`/home/post/${post.id}`}>
                                        <div className="mb-5">
                                            <h3 className="font-bold text-lg dark:text-white">{post.title}</h3>
                                            <p className="text-gray-700 dark:text-white">{post.details}</p>
                                        </div>
                                    </Link>

                                    {/* ส่วนรูปภาพ (แสดงเมื่อมีรูป) */}
                                    {post.image && (
                                        <div className="mt-2">
                                             <img src={post.image.startsWith("data:image/") ? post.image : base64Pic + post.image} alt="Post Image" className="w-full rounded-lg" />
                                        </div>
                                    )}

                                    {/* ปุ่ม Like, Comment, Share */}
                                    <div className="flex items-center space-x-5 mt-4 text-gray-600 dark:text-black">
                                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                                <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-2"/>
                                            </span> <span>{post.likeCount}</span>ถูกใจ
                                        </button>
                                        <button onClick={() => redirect(`/home/post/${post.id}`)} className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                                <img src="/assets/comment.png" alt="Home" className="w-6 h-6 mr-2" />
                                            </span> <span>{post.comments ?? 0}</span>ความคิดเห็น
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                            <img src="/assets/share.png" alt="Home" className="w-6 h-6 mr-2" />    
                                            </span> <span>{post.shares ?? 0}</span>แชร์
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
           
        </div>
    )
}