"use server"

import { redirect } from "next/navigation"

export async function create(prevState, formData) {
    const title = formData.get('title')
    const description = formData.get('description')
    const imageUrl = formData.get('imageUrl')
    
    redirect('/home')
}