"use server"

import { redirect } from "next/navigation"

export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    
    redirect('/home')
}