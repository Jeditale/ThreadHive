"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import { useState, useEffect,useActionState,startTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from 'next/link';
import Swal from "sweetalert2";
import { editPost } from "./action";

export default function EditPost() {

    const [state, formAction] = useActionState(editPost,null);
    const [user, setUser] = useState([])
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')

    const base64Pic = "data:image/png;base64,"
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("userToken")
    const defaultPic = "/assets/profile.png"
    const params = useParams();
    const postId = params.id;
    const router = useRouter();
   
    useEffect(() => {
        async function getUser() {
            const user = await fetch(`http://localhost:3000/users/${userId}`, {
                mode: 'cors',
                headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
            })
            const data = await user.json();
            console.log(data)
            setUser(data)
        }
        async function getPost() {
            const response = await fetch(`http://localhost:3000/posts/${postId}`,{
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error("cannot fetch");
            }
            const postData = await response.json();
            setTitle(postData.title)
            setDetails(postData.details)
        }
        getUser()
        getPost()
           
    },[])
   
       const handleSubmit = async (event) => {
           event.preventDefault();
           const formData = new FormData(event.target);
           formData.append("title", title)
           formData.append("details", details)
           formData.append("userId", userId);
           formData.append("userToken", token);
           formData.append("postId", postId)
   
           startTransition(() => {
               formAction(formData);
           });
       };

       useEffect(() => {
        if (state?.success) {
          Swal.fire({
            title: "แก้ไขข้อมูลสำเร็จ!",
            text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ตกลง",
          }).then(() => {
            router.push(`/home/post/${postId}`);
          });
        }
      }, [state, router, postId]);

    return(
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar/>
            <SideBar/>
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <p className="text-center text-xl mb-5 dark:text-white">แก้ไขโพสต์</p>
                    <form className="bg-[#FFF8DC] dark:bg-[#5b4e4a] shadow-lg rounded-2xl p-6 w-full h-min" onSubmit={handleSubmit}>

                        {/* โปรไฟล์ */}
                        <div className="flex items-center mb-2">
                            <img src={user.profilePicture} alt="Profile" className="h-14 w-14 mr-2"></img>
                            <div>
                                <p className="font-semibold dark:text-white">{user.usrname}</p>
                                
                            </div>
                        </div>

                        {/* ข้อความ */}
                        <div>
                            <textarea value={title} onChange={(e) => setTitle(e.target.value)} placeholder="หัวข้อโพสต์" className="w-full p-3 mt-5 border rounded-lg bg-white dark:bg-[#FEF7D8]" rows={1}></textarea>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="ข้อความ" className="w-full p-3 mt-5 border rounded-md bg-white dark:bg-[#FEF7D8]" rows={4}></textarea>
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
                            <button type="submit" className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2"
                            >แก้ไข</button>
                            <Link href="/user" className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl p-9 pt-2 pb-2">ยกเลิก</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}