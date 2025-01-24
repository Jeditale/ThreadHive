import NavBar from "../components/Navbar"
import SideBar from "../components/Sidebar"
import Link from "next/link"

async function getPosts() {
    const response = await fetch('https://678497a11ec630ca33a4d90c.mockapi.io/blog')
    if(!response.ok){
      throw new Error('cannot fetch')
  
    }
    return response.json()
  }


export default async function Posts(){
    // const headersRequest = headers()
    // const user = JSON.parse(headersRequest.get('user'))
    const posts = await getPosts()

    return (
        <div className="bg-[#FAF3B8]">
           <NavBar/>
           <SideBar/>
            <div>
                <div className="grid grid-cols-6 mt-5" >
                    {/* โพสต์แต่ละโพสต์ */}
                    <div className="col-start-3 col-span-3 w-auto">
                        <div>
                            {posts.map((post, index) => (
                                <div key={index} className="p-5 m-3 border-2 rounded-lg bg-[#FFF8DC] shadow-lg w-auto">

                                    {/*  ส่วนโปรไฟล์, ชื่อ และวันที่โพสต์ */}
                                    <div className="flex items-center space-x-3 mb-3">
                                        <img src={post.userProfile} alt="Profile" className="w-12 h-12 rounded-full border" />
                                        <div>
                                            <p className="font-semibold">{post.userName}</p>
                                            <p className="text-gray-500 text-sm">{post.createdAt}</p>
                                        </div>
                                    </div>

                                    {/* ส่วนข้อความ */}
                                    <Link href={`/home/post/${post.id}`}>
                                        <div className="mb-3">
                                            <h3 className="font-bold text-lg">{post.title}</h3>
                                            <p className="text-gray-700">{post.description}</p>
                                        </div>
                                    </Link>

                                    {/* ส่วนรูปภาพ (แสดงเมื่อมีรูป) */}
                                    {post.image && (
                                        <div className="mt-2">
                                            <img src={post.image} alt="Post Image" className="w-full rounded-lg border" />
                                        </div>
                                    )}

                                    {/* ปุ่ม Like, Comment, Share */}
                                    <div className="flex items-center space-x-5 mt-4 text-gray-600">
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                                <img src="/assets/like.png" alt="Home" className="w-6 h-6 mr-2" />
                                            </span> <span>{post.likes ?? 0}</span>ถูกใจ
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
                                            <span className="text-xl">
                                                <img src="/assets/comment.png" alt="Home" className="w-6 h-6 mr-2" />
                                            </span> <span>{post.comments ?? 0}</span>ความคิดเห็น
                                        </button>
                                        <button className="flex items-center space-x-1 bg-white hover:bg-[#EAC67A] p-2 rounded-2xl shadow-lg">
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