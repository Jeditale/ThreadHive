"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import { create } from "./action";
import { useActionState } from "react";

export default function CreatePost() {
    const init = {};

    const [state, formAction] = useActionState(create, init);

    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-3 col-span-3">
                    <p className="text-center text-xl ">สร้างโพสต์</p>

                <form action={formAction} className="bg-[#FEF7D8] p-8 rounded-2xl shadow-lg w-full mt-5">
                    {/* ส่วนหัวของโปรไฟล์ */}
                    <div className="flex items-center space-x-3 mb-4">
                        <img src="/assets/profile.png" alt="Profile" className="w-10 h-10 rounded-full" />
                        <div>
                            <p>name_ee</p>
                        </div>
                    </div>

                    {/* กรอกหัวข้อ */}
                    <div className="mb-2">
                        <textarea name="title" placeholder="หัวข้อโพสต์" className="w-full p-3 border rounded-lg bg-white" rows={1}></textarea>
                    </div>

                    {/* ช่องกรอกข้อความ */}
                    <div className="mb-2">
                        <textarea name="description" placeholder="ข้อความ" className="w-full p-3 border rounded-lg bg-white" rows={4}></textarea>
                    </div>

                    {/* ปุ่มเพิ่มรูปภาพ */}
                    <div className="flex items-center space-x-2 text-[#D89614] cursor-pointer hover:text-[#B87C0D]">
                        <img src="/assets/addPhoto.png" alt="Upload" className="w-10 h-10" />
                        <span className="font-medium">เพิ่มรูปภาพ</span>
                    </div>

                    {/* แสดงรูปภาพ */}
                    <div>
                        <img></img>
                    </div>

                    {/* ปุ่มโพสต์ */}
                    <div className="mt-6 flex justify-center">
                        <button className="bg-[#3C2A10] text-white text-lg p-20 pt-2 pb-2 rounded-2xl shadow-md hover:bg-[#2A1C08]">
                            โพสต์
                        </button>
                    </div>

                </form>
                </div>
            </div>
        </div>
    );
}
