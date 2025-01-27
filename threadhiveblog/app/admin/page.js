import Link from "next/link";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";

async function getPosts() {
    try {
        const response = await fetch("https://678497a11ec630ca33a4d90c.mockapi.io/blog");

        if (!response.ok) {
            throw new Error("Cannot fetch posts");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getUsers() {
    try {
        const response = await fetch("https://678497a11ec630ca33a4d90c.mockapi.io/users");

        if (!response.ok) {
            throw new Error("Cannot fetch users");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function AdminDashboard() {
    const posts = await getPosts();
    const users = await getUsers(); 
    
    return(
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar/>
            <SideBar/>
            
            {/* แสดงจำนวนโพสต์และผู้ใช้ */}
            <div className="grid grid-cols-6 mt-5">
                <div className="col-start-2 col-span-2 ml-10">
                    <div className="bg-[#FFF8DC] p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-3xl m-2 mb-5">โพสต์ทั้งหมด</h2>
                        <label className="bg-[#EAC67A] shadow-lg rounded-2xl p-24 pt-8 pb-8 text-7xl font-semibold mb-10 inline-block">1250</label>

                        <label className="text-4xl text-[#3A3000]">___________________________</label>

                        <h2 className="text-3xl m-2 mt-10 mb-5">ผู้ใช้ทั้งหมด</h2>
                        <label className="bg-[#EAC67A] shadow-lg rounded-2xl p-24 pt-8 pb-8 text-7xl font-semibold mb-10 inline-block">250</label>
                    </div>
                </div>

                {/* ตารางแสดงผู้ใช้ */}
                <div className="col-start-4 col-span-3 ml-10 mr-10">
                    <div className=" p-6">
                        <h2 className="text-xl font-semibold mb-4">รายชื่อผู้ใช้</h2>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-[#FFF8DC]">
                                    <th className="border border-gray-300 p-2">โปรไฟล์</th>
                                    <th className="border border-gray-300 p-2">ชื่อ</th>
                                    <th className="border border-gray-300 p-2">โพสต์ทั้งหมด</th>
                                    <th className="border border-gray-300 p-2">ตัวเลือก</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="text-center">
                                        <td className="border border-gray-300 p-2">
                                <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full mx-auto" />
                                        </td>
                                        <td className="border border-gray-300 p-2">{user.name}</td>
                                        <td className="border border-gray-300 p-2">{user.totalPosts}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button className="bg-[#3A3000] text-white px-4 py-1 rounded-lg hover:bg-[#2A1C08]">เลือก</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
