"use client"

import NavBar from "@/app/components/Navbar"
import SideBar from "@/app/components/Sidebar"
import Link from "next/link"
import { useState, useEffect, use } from "react"

async function getPost(id) {
    const response = await fetch(`https://threadhive.onrender.com/posts/${id}`)
    if (!response.ok) {
        throw new Error('cannot fetch')
    }
    return response.json()
}

async function getComment(id) {
  const response = await fetch(`https://threadhive.onrender.com/post-comments/all/${id}`)
  if (!response.ok) {
    throw new Error('cannot fetch')
  }
  return response.json()
  
}

export default function Post({ params }) {
    const { id } = use(params);

    const [post, setPost] = useState({
        title: '',
        details: '',
        userProfile: '',
        username: '',
        createdAt: '',
        image: '',
        likes: 0,
        comments: 0,
        shares: 0
    });

    const [comment, setComment] = useState({
        id: '',
        postId: '',
        userId: '',
        comment: '',
        createdAt: ''
    })

    const initPost = async () => {
        try {
            const result = await getPost(id);
            setPost(result);
        } catch (error) {
            console.log('error', error);
        }
    };

    const initComment = async () => {
      try {
          const result = await getComment(id);
          setComment(result);
      } catch (error) {
          console.log('error', error);
      }
    }

    useEffect(() => {
        initPost();
        
    }, []);

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
          <NavBar />
          <SideBar />
          <div className="grid grid-cols-6 pt-5">
            <div className="col-start-3 col-span-3">
              <div className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                {/* ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                <div className="flex items-center space-x-3 mb-3">
                  <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full" />
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
                <h3 className="font-bold text-lg dark:text-white">{post.title}</h3>
                <p className="text-gray-700 mb-5 dark:text-white">{post.details}</p>


                {/* ส่วนรูปภาพ (แสดงเมื่อมีรูป) */}
                {post.image && (
                    <div className="mt-2">
                        <img src={post.image} alt="Post Image" className="w-full rounded-lg" />
                    </div>
                )}

                {/* ปุ่ม Like, Comment, Share */}
                <div className="flex items-center space-x-5 mt-4 text-gray-600 dark:text-black">
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/like.png" alt="Like" className="w-6 h-6 mr-2" />
                      <span>{post.likes ?? 0}</span> ถูกใจ
                    </button>
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/comment.png" alt="Comment" className="w-6 h-6 mr-2" />
                      <span>{post.comments ?? 0}</span> ความคิดเห็น
                    </button>
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/share.png" alt="Share" className="w-6 h-6 mr-2" />
                      <span>{post.shares ?? 0}</span> แชร์
                    </button>
                </div>
              </div>


              {/* ส่วนแสดงความคิดเห็น */}
              <div className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                <p className="font-semibold dark:text-white">แสดงความคิดเห็น</p>
                <div className="flex items-center mt-2">
                  <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full mr-2" />
                  <input type="text" placeholder="เขียนความคิดเห็น..." className="w-full p-2 border rounded-lg dark:bg-[#FEF7D8]" />
                  <button className="ml-2 p-2 bg-yellow-500 hover:bg-[#EAC67A] text-white rounded-md">
                    <img src="/assets/ment.png" className="w-6 h-6"></img>
                  </button>
                </div>
              </div>

              {/* ความคิดเห็นทั้งหมดที่แสดง */}
              <div className="mt-4">
                <div className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                  {/* ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full" />
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
                  <p className="text-gray-700 dark:text-white">{comment.comment}</p>

                  {/* ปุ่ม Like, Comment, Share */}
                  <div className="flex items-center space-x-5 mt-4 text-gray-600 dark:text-black">
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/like.png" alt="Like" className="w-6 h-6 mr-2" />
                      <span>{post.likes ?? 0}</span> ถูกใจ
                    </button>
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/comment.png" alt="Comment" className="w-6 h-6 mr-2" />
                      <span>{post.comments ?? 0}</span> ความคิดเห็น
                    </button>
                    <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                      <img src="/assets/share.png" alt="Share" className="w-6 h-6 mr-2" />
                      <span>{post.shares ?? 0}</span> แชร์
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
    );
}
