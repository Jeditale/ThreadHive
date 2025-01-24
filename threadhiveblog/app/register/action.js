"use server"

import { redirect } from "next/navigation"

export async function register(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const fname = formData.get('fname')
    const lname = formData.get('lname')
    const username = formData.get('username')
    const profile_image = formData.get('profile_image')
    const birthdate = formData.get('birthdate')
    const gender = formData.get('gender')
    // const createDate
    console.log(formData)
    redirect('/home')
}