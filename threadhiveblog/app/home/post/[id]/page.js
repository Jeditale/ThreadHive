"use client"

import NavBar from "@/app/components/Navbar"
import SideBar from "@/app/components/Sidebar"
import { useState, useEffect, use } from "react"

async function getPost(id) {
    const response = await fetch(`https://678497a11ec630ca33a4d90c.mockapi.io/blog/${id}`)
    if(!response.ok){
      throw new Error('cannot fetch')
  
    }
    return response.json()
  }

export default function Post({params}) {

    const { id } = use(params);

    const [postState, setPostState] = useState({
        title:'',
        description:''

    })

    const initPost = async () => {
        try {
            const result = await getPost(id)
            setPostState(result)
        } catch (error) {
            console.log('error',error)
        }
        
    }

    
    useEffect(() => {
        initPost()
    },[])

    return (
      <div>
        <NavBar/>
        <SideBar/>
        <div className="grid grid-cols-6 pt-16">
          <div className="col-start-3 col-span-3">
            <div className="border-2 border-r-amber-100">
                {postState.title}
                <div>
                    Post : {postState.description}
                </div>
                <div>
                    Comment :  //Map comment from database
                </div>
            </div>
          </div>
          
        </div>
        
        
      </div>
      
    );
  }