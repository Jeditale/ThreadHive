"use client"

import { create } from "./action"
import { useActionState } from "react"

export default function CreatePost() {

    const init = {

    }

    const [state, formAction] = useActionState(create,init)
    return (
        <div>
            <form action={formAction}>
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