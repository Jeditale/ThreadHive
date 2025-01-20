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
                <div>
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}