import { headers } from "next/headers"
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
            <div id="navBar" className="relative">
                <div className="fixed top-0 left-0 right-0">
                    <div className="flex space-x-4 float-start">
                        Logo
                    </div>
                    <div className="flex space-x-4 float-end">
                        <Link href={`/login`} className="rounded-md px-3 py-2 ">Login</Link>
                        <Link href={`/register`} className="rounded-md px-3 py-2">Register</Link>
                    </div>
                    <div id="searchBar">
                        
                        <form className="max-w-md mx-auto">   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm" placeholder="Search" />
                                <button type="submit" className=" absolute end-2.5 bottom-2.5">Search</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="p-10 pl-20 pr-20"> 
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
                <div className="relative">
                    <Link href={`/home/post`} className="fixed bottom-0 left-3000 right-0 border-2 rounded-md border-gray-400 p-3 m-3">create new post</Link>
                </div>
            </div>
        </div>
    )
}