"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import { create } from "./action";
import { useActionState, useEffect, useState,startTransition } from "react";
import { redirect } from "next/navigation";

export default function CreatePost() {

    const [state, formAction] = useActionState(create, null);
    const [user, setUser] = useState([])
    const base64Pic = "data:image/png;base64,"
    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState("");
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("userToken")

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
        getUser()
        
    },[])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64(reader.result.split(",")[1]);
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("userId", userId);
        formData.append("userToken", token);
        formData.append("image", imageBase64);

        startTransition(() => {
            formAction(formData);
        });

        setTimeout(() => {
            redirect('/home')
        }, 1000);
    };

    return (
        <div className="bg-[#FAF3B8] dark:bg-[#3A2E2A] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <p className="text-center text-xl dark:text-white">สร้างโพสต์</p>

                <form className="bg-[#FEF7D8] dark:bg-[#5b4e4a] p-8 rounded-2xl shadow-lg w-full mt-5" onSubmit={handleSubmit}>
                    {/* ส่วนหัวของโปรไฟล์ */}
                    <div className="flex items-center space-x-3 mb-4">
                        <img src={user.profilePicture ? base64Pic + user.profilePicture : "/assets/jyn.png"} alt="Profile" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="dark:text-white">{user.usrname}</p>
                        </div>
                    </div>

                    {/* กรอกหัวข้อ */}
                    <div className="mb-2">
                        <textarea name="title" placeholder="หัวข้อโพสต์" className="w-full p-3 border rounded-lg bg-white dark:bg-[#FEF7D8]" rows={1}></textarea>
                    </div>

                    {/* ช่องกรอกข้อความ */}
                    <div className="mb-2">
                        <textarea name="details" placeholder="ข้อความ" className="w-full p-3 border rounded-lg bg-white dark:bg-[#FEF7D8]" rows={4}></textarea>
                    </div>

                    {/* ปุ่มเพิ่มรูปภาพ */}
                    <label className="flex items-center space-x-2 text-[#D89614] cursor-pointer hover:text-[#B87C0D]">
                        <img src="/assets/addPhoto.png" alt="Upload" className="w-10 h-10" />
                        <span className="font-medium">เพิ่มรูปภาพ</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>

                    {/* แสดงรูปภาพ */}
                    {imagePreview && (
                        <div className="mt-3">
                            <img src={imagePreview} alt="Preview" className="w-full rounded-lg shadow-md" />
                        </div>
                    )}

                    {/* ปุ่มโพสต์ */}
                    <div className="mt-6 flex justify-center">
                        <button type="submit" className="bg-[#3C2A10] text-white text-lg p-20 pt-2 pb-2 rounded-2xl shadow-md hover:bg-[#2A1C08]">
                            โพสต์
                        </button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    );
}
