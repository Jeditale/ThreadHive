"use client";

import NavBar from "@/app/components/Navbar";
import SideBae from "@/app/components/Sidebar";
import { create } from "./action";
import { useActionState } from "react";

export default function CreatePost() {
    const init = {};

    const [state, formAction] = useActionState(create, init);

    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar />
            <SideBae />
            <div className="flex flex-grow justify-center items-center mt-10">
                <form action={formAction} className="bg-[#FEF7D8] p-8 rounded-2xl shadow-lg w-[40%]">
                    
                    {/* ส่วนหัวของโปรไฟล์ */}
                    <div className="flex items-center space-x-3 mb-4">
                        <img src="/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
                    </div>

                    {/* ช่องกรอกข้อความ */}
                    <div className="mb-4">
                        <textarea name="description" placeholder="ข้อความ" className="w-full p-3 border rounded-md bg-white" rows={4}></textarea>
                    </div>

                    {/* ปุ่มเพิ่มรูปภาพ */}
                    <div className="flex items-center space-x-2 text-[#D89614] cursor-pointer hover:text-[#B87C0D]">
                        <img src="/assets/addPhoto.png" alt="Upload" className="w-6 h-6" />
                        <span className="font-medium">เพิ่มรูปภาพ</span>
                    </div>

                    {/* ปุ่มโพสต์ */}
                    <div className="mt-6 flex justify-center">
                        <button className="bg-[#3C2A10] text-white text-lg p-10 pt-2 pb-2 rounded-2xl shadow-md hover:bg-[#2A1C08]">
                            โพสต์
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
