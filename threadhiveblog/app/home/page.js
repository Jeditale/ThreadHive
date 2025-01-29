"use client"

import NavBar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import Link from "next/link"
import ThemeToggle from "../components/ThemeToggle"
import { useEffect, useState } from "react";

export default  function Posts(){

    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const base64Pic = "data:image/png;base64,"

    useEffect(() => {
        async function getPosts() {
            console.log(sessionStorage.getItem("userToken"))
            const response = await fetch('https://threadhive.onrender.com/posts')
            if(!response.ok){
              throw new Error('cannot fetch')
          
            }
            const data = await response.json();
            setPosts(data) 
          } 
          async function getUserFromPost(id) {
            const response = await fetch(`https://threadhive.onrender.com/users/${id}`)
            if(!response.ok){
                throw new Error('cannot fetch')
            
              }
            const data = await response.json();
            setUsers(data)
          }
        getPosts()
        getUserFromPost(posts.map((post) => (
            post.userId
        )))
    },[])

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
                                        <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full border" />
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
                                            <img src={base64Pic+(post.image)} alt="Post Image" className="w-full rounded-lg" />
                                        </div>
                                    )}

                                    {/* ปุ่ม Like, Comment, Share */}
                                    <div className="flex items-center space-x-5 mt-4 text-gray-600 dark:text-black">
                                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                                <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-2" />
                                            </span> <span>{post.likes ?? 0}</span>ถูกใจ
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
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