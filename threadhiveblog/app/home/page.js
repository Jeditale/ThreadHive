import NavBar from "../components/Navbar"
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
        <div>
           <NavBar/>
            <div>
                <div className="grid grid-cols-6 pt-16" >
                    <div className="col-start-1 bg-orange-700 fixed h-full">
                        <div className="grid grid-rows-3 p-4">
                            <div>
                                {/* ใส่ไอคอนให้อยู่บรรทัดเดียวกัน */}
                                <Link href={`/home`} className="float-start p-3 m-3 hover:bg-white border-0 rounded-md w-56 ">Home</Link>
                            </div>
                            <div>
                                {/* ใส่ไอคอนให้อยู่บรรทัดเดียวกัน */}
                                <Link href={`/user`} className="float-start p-3 m-3 hover:bg-white border-0 rounded-md w-56 ">Profile</Link>
                            </div>
                            <div>
                                {/* ใส่ไอคอนให้อยู่บรรทัดเดียวกัน */}
                                <Link href={`/home/post`} className="float-start p-3 m-3 hover:bg-white border-0 rounded-md w-56 ">New post</Link>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="col-start-3 col-span-3"> 
                        <div>
                            {posts.map((post, index) => (
                                <div key={index} className="p-5 m-3 border-2 rounded-lg"  >
                                    <Link href={`/home/post/${post.id}`}>
                                        <div>{post.title}</div>
                                        <div>{post.description}</div>
                                        <div>{post.tags}</div>
                                    </Link>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}