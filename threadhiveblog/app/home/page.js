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
            <div> 
                {posts.map((post, index) => (
                    <div key={index} >
                        {post.title} | {post.tags}
                        
                        <div></div>
                        <Link href={`/home/post/${post.id}`} className="border-2 border-gray-400">Go to blog...</Link>
                    </div>
                    )
                )}
            </div>

            <div>
                <Link href={`/home/post`} className="border-2 border-gray-400">create new post</Link>
            </div>
        </div>
    )
}