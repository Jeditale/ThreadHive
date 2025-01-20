"use client"

import { register } from "./action"
import { useActionState } from "react"

export default function RegisterPage() {

    const init = {

    }

    const [state, formAction] = useActionState(register,init)
    return (
        <div>
            <form action={formAction}>
                <div>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div>
                    <input type="text" name="fname" placeholder="Firstname" />
                </div>
                <div>
                    <input type="text" name="lname" placeholder="Lastname" />
                </div>
                <div>
                    <input type="text" name="gender" placeholder="Gender" />
                </div>
                <div>
                    <input type="text" name="birthdate" placeholder="Birthdate" />
                </div>
                <div>
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Confirm Password" />
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}