"use client"

import { login } from "./action"
import { useActionState } from "react"

export default function LoginPage() {

    const init = {

    }

    const [state, formAction] = useActionState(login,init)
    return (
        <div>
            <form action={formAction}>
                <div className="border-2">
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="border-2">
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button className="border-2">Login</button>
            </form>
        </div>
    )
}