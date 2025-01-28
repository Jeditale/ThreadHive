"use client";

import NavBar from "@/app/components/Navbar";
import SideBar from "@/app/components/Sidebar";
import Link from "next/link";
import Swal from "sweetalert2";

export default function SelectUser() {
    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-12 gap-4 mt-5 px-10">
                
                {/* โปรไฟล์ */}
                <div className="col-start-3 col-span-4 flex justify-center">
                    <div className="bg-[#FFF8DC] shadow-lg rounded-2xl p-10 w-full h-min max-w-sm">
                        <div className="flex flex-col items-center">
                            <img src="/assets/profile.png" className="w-36 h-36 mb-5" />
                            <p className="text-2xl mb-5 font-semibold">name_ee</p>
                            <div>
                                <button className="bg-[#3A3000] hover:bg-[#2A1C08] text-white shadow-lg rounded-2xl px-6 py-2 mr-2"> 
                                    แก้ไขโปรไฟล์
                                </button>
                                <Link href="/admin" className="bg-[#960000] hover:bg-[#690000] text-white shadow-lg rounded-2xl px-6 py-2"
                                    onClick={() => {
                                        Swal.fire({
                                        title: "คุณแน่ใจหรือไม่?",
                                        text: "หากลบแล้วจะไม่สามารถกู้คืนบัญชีนี้ได้!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#3085d6",
                                        onfirmButtonText: "ใช่",
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
                                                    text: "บัญชีถูกลบเรียบร้อยแล้ว",
                                                    icon: "success",
                                                    confirmButtonColor: "#3085d6",
                                                    confirmButtonText: "ตกลง",
                                                });
                                            }
                                        });
                                    }}
                                >ลบบัญชีผู้ใช้
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ส่วนโพสต์ */}
                <div className="col-start-7 col-span-8">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg">โพสต์ทั้งหมด</h2>
                    </div>

                    {/* โพสต์แต่ละโพสต์ */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* ใส่แลขจำนวนโพสต์ตรงนี้ */}
                        {[1, 2, 3, 4, 5, 6].map((post, index) => (
                            <div key={index} className="bg-[#FFF8DC] shadow-lg rounded-2xl p-5">
                                <div className="flex items-center mb-2">
                                    <img src="/assets/profile.png" className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-semibold">name_ee</p>
                                        <p className="text-sm text-gray-600">1 ม.ค. 2568 12:30</p>
                                    </div>
                                    <div>
                                        <Link href="/admin/select/editPost" className="bg-[#3A3000] hover:bg-[#2A1C08] shadow-lg rounded-2xl text-white pl-2 pr-2 mr-1 ml-14">แก้ไข</Link>
                                        <Link href="/admin/select" className="bg-[#960000] hover:bg-[#690000] shadow-lg rounded-2xl text-white pl-2 pr-2"
                                        onClick={() => {
                                            Swal.fire({
                                            title: "คุณแน่ใจหรือไม่?",
                                            text: "หากลบแล้วจะไม่สามารถกู้คืนโพสต์นี้ได้!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#d33",
                                            cancelButtonColor: "#3085d6",
                                            onfirmButtonText: "ใช่",
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
                                                }
                                            });
                                        }}
                                        >ลบ</Link>
                                    </div>
                                </div>
                                <p className="mb-4">ไม่มีความคิดใหม่เล็กเกินไป ถ้ามันทำให้คุณก้าวไปข้างหน้า</p>

                                <div className="mt-4 flex items-center justify-between">
                                    {/* ปุ่ม like comment shares*/}
                                    <div className="flex items-center space-x-5 mt-4 text-gray-600">
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-1 pr-3 rounded-2xl shadow-lg flex-nowrap">
                                            <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-1" />
                                            <span className="text-xs sm:text-sm whitespace-nowrap"></span>{post.likes ?? 0}ถูกใจ
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-1 pr-5 rounded-2xl shadow-lg flex-nowrap">
                                            <img src="/assets/comment.png" alt="comment" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            <span className="text-xs sm:text-sm whitespace-nowrap">{post.comments ?? 0} ความคิดเห็น</span>
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-1 pr-3 rounded-2xl shadow-lg flex-nowrap">
                                            <img src="/assets/share.png" alt="Home" className="w-6 h-6 mr-1" />
                                            <span className="text-xs sm:text-sm whitespace-nowrap"></span>{post.shares ?? 0}แชร์
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
