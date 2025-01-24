import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";

async function getPost(id) {
    const response = await fetch(`https://678497a11ec630ca33a4d90c.mockapi.io/blog/${id}`);
    if (!response.ok) {
        throw new Error("cannot fetch");
    }
    return response.json();
}

export default function User() {
    return (
        <div className="bg-[#FAF3B8] min-h-screen">
            <NavBar />
            <SideBar />
            <div className="grid grid-cols-7 mt-5">
                <div className="col-start-3 col-span-5">
                    {/* User Info Section */}
                    <div className="bg-[#FFF8DC] rounded-lg p-5 shadow-lg w-full h-52 max-w-4xl mb-6">
                        <div className="flex items-center">
                            <div className="w-36 h-36  rounded-full">
                                <img src="/assets/profile.png" alt="Profile" className="w-auto h-35 rounded-full border" />
                            </div>
                            <div className="ml-5">
                                <p className="text-xl font-semibold mb-5">name_ee</p>
                                <button className="bg-[#3A3000] text-white px-4 py-2 rounded-lg mr-2">แก้ไขโปรไฟล์</button>
                                <button className="bg-[#960000] text-white px-4 py-2 rounded-lg">ออกจากระบบ</button>
                                <button className="bg-white px-4 py-2 rounded-lg w-auto ">
                                    <img src="/assets/newPost.png" alt="newPost" className="w-5 h-5 rounded-full" />เขียนโพสต์
                                </button>
                            </div>
                        </div>
                    </div>

                    
        </div>
      </div>
    </div>
  );
}
