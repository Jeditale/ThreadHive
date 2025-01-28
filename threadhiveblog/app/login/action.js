"use server"

import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://threadhive.onrender.com/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));

    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token);

    redirect('/home')

}