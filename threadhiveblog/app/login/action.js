"use server"

import axios from "axios"
import { cookies } from "next/headers"


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
          'Content-Type': 'application/json',
        },
        data : data
    };


    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    const user = response.data
    cookies().set("token", user.token)

    return user;

}