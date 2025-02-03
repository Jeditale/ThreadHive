"use client"

import NavBar from "@/app/components/Navbar"
import SideBar from "@/app/components/Sidebar"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect, use, useActionState,startTransition } from "react"
import { postComment } from "./action"

export default function Post() {
  const params = useParams();
  const postId = params.id;
  const base64Pic = "data:image/png;base64,"

  const [post, setPost] = useState({
      title: '',
      details: '',
      createdAt: '',
      image: '',
  });

  const [comments, setComment] = useState([])
  const [state, formAction] = useActionState(postComment,null)

  async function deleteComment(id) {
    const response = await fetch(`http://localhost:3000/post-comments/${id}`,{
        method : "DELETE",
        headers : {
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
        }
    })
    if (!response.ok) {
        throw new Error("cannot delete");
    }

    window.location.reload();
  }

    useEffect(() => {
      async function getPost() {
        try {
          const response = await fetch(`http://localhost:3000/posts/${postId}`);
          if (!response.ok) throw new Error("Cannot fetch post");
  
          const postData = await response.json();
  
          const userRes = await fetch(`http://localhost:3000/users/${postData.userId}`);
          const userShow = userRes.ok ? await userRes.json() : {
            profilePicture: "",
            usrname: "Unknown user"
          };
  
          setPost({
            ...postData,
            username: userShow.usrname ?? "Unknown user",
            profilePicture: userShow.profilePicture ?? ""
          });
  
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    
      async function getComment() {
        const response = await fetch(`http://localhost:3000/post-comments/all/${postId}`)
        if (!response.ok) {
          throw new Error('cannot fetch')
        }
        const data = await response.json()
        console.log("Fetched comments:", data);

        const commentsArray = data.postComments


        const addData = await Promise.all(
          commentsArray.map(async (commentFetch) => {
              try {
                  console.log(`Fetching data for userId: ${commentFetch.userId}`);
                  const userRes = await fetch(`http://localhost:3000/users/${commentFetch.userId}`)
                  
                  const userShow = userRes.ok ? await userRes.json() : {
                      profilePicture: '',
                      usrname: "Unknown user"
                  };

                  return {
                      ...commentFetch,
                      username: userShow.usrname ?? "Unknown user",
                      profilePicture: userShow.profilePicture ?? ''
                  };

              } catch (error) {
                  console.error("Error fetching like/user data:", error);
                  return {
                      ...commentFetch,
                      username: "Unknown user",
                      profilePicture: ''
                  };
              }
          })
        );
        setComment(addData)
        console.log("Updated comments:", addData);
      }

      getPost()
      getComment()

      if (state) {
        getComment();
      }
        
    }, [state]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append("postId", postId)
      formData.append("userToken", sessionStorage.getItem("userToken"))
      formData.append("userId", sessionStorage.getItem("userId"))

      startTransition(() => {
        formAction(formData);
      });

      
    };

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
          <NavBar />
          <SideBar />
          <div className="grid grid-cols-6 pt-5">
            <div className="col-start-3 col-span-3">
              <div className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                {/* ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                <div className="flex items-center space-x-3 mb-3">
                  <img src={post.profilePicture ? base64Pic + post.profilePicture : "/assets/jyn.png"} alt="Profile" className="w-12 h-12 rounded-full" />
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
                        <img src={base64Pic+post.image} alt="Post Image" className="w-full rounded-lg" />
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
              <form onSubmit={handleSubmit} action={formAction} className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                <p className="font-semibold dark:text-white">แสดงความคิดเห็น</p>
                <div className="flex items-center mt-2">
                  <img src={post.profilePicture ? base64Pic + post.profilePicture : "/assets/jyn.png"} alt="Profile" className="w-12 h-12 rounded-full mr-2" />
                  <input type="text" name="comment" placeholder="เขียนความคิดเห็น..." className="w-full p-2 border rounded-lg dark:bg-[#FEF7D8]" />
                  <button className="ml-2 p-2 bg-yellow-500 hover:bg-[#EAC67A] text-white rounded-md">
                    <img src="/assets/ment.png" className="w-6 h-6"></img>
                  </button>
                </div>
              </form>

              {/* ความคิดเห็นทั้งหมดที่แสดง */}
              <div className="mt-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-5 m-3 rounded-lg bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={comment.profilePicture ? base64Pic + comment.profilePicture : "/assets/jyn.png"} alt="Profile" className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-semibold dark:text-white">{comment.username}</p>
                        <p className="text-gray-500 text-sm dark:text-white">
                          {new Date(comment.createdAt).toLocaleDateString("th-TH", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-white">{comment.comment}</p>

                    <div className="flex items-center justify-between mt-4 text-gray-600 dark:text-black">
                      <div className="flex items-center space-x-5">
                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                          <img src="/assets/like.png" alt="Like" className="w-6 h-6 mr-2" />
                          <span>{post.likes ?? 0}</span> ถูกใจ
                        </button>
                        <button className="flex items-center space-x-1 bg-white dark:bg-[#cdc5a4] hover:bg-[#EAC67A] dark:hover:bg-[#afa87f] p-2 rounded-2xl shadow-lg">
                          <img src="/assets/comment.png" alt="Comment" className="w-6 h-6 mr-2" />
                          <span>{post.comments ?? 0}</span> ความคิดเห็น
                        </button>
                      </div>
                      {sessionStorage.getItem("userId") === String(comment.userId) && (
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="bg-[#960000] text-white hover:bg-[#690000] shadow-lg px-4 py-2 rounded-lg ml-auto"
                        >
                          ลบ
                        </button>
                      )}
                    </div>

                  </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
    );
}
