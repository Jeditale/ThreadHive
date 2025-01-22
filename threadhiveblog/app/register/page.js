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
                <div className="border-2">
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className="border-2">
                    <input type="text" name="fname" placeholder="Firstname" />
                </div>
                <div className="border-2">
                    <input type="text" name="lname" placeholder="Lastname" />
                </div>
                <div className="border-2">
                    <input type="text" name="gender" placeholder="Gender" />
                    {/* Dropdown */}
                </div>
                <div className="border-2">
                    <input type="text" name="birthdate" placeholder="Birthdate" />
                    {/* Datepick */}
                </div>
                <div className="border-2">
                    <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="border-2">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="border-2">
                    <input type="password" name="password" placeholder="Confirm Password" />
                </div>
                <button className="border-2">Register</button>
            </form>
        </div>
    )
}