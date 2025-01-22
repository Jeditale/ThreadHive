"use client"

import NavBar from "@/app/components/Navbar"
import { create } from "./action"
import { useActionState } from "react"

export default function CreatePost() {

    const init = {

    }

    const [state, formAction] = useActionState(create,init)
    return (
        <div>
            <NavBar/>
            <form action={formAction} className="pt-16">
                <div>
                    <input type="text" name="title" placeholder="Title" />
                </div>
                <div>
                    <input type="text" name="description" placeholder="Description" />
                </div>
                <div>
                    <input type="text" name="imageUrl" placeholder="Image" />
                </div>
                <button>Post</button>
            </form>
        </div>
    )
}