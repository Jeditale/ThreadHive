"use server"

import axios from "axios"
import { headers } from "next/headers"


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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiSmVkaXRhbGVAaG90bWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzM4MDQ1MTY4LCJleHAiOjE3Mzg2NDk5Njh9.OhcOVv0PqqurLDr05B9mLWvT7P8CaLoi7BVfi6ZZZRA'
        },
        data : data
    };

    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));

    const user = response.data

    const token = user.token;

    let nextConfig = {
        method: 'get',  // for example, fetching user profile
        url: `https://threadhive.onrender.com/users/${user.userId}`,  // replace with the desired API endpoint
        headers: {
            'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
        }
    };

    // Send the request with the token included
    const profileResponse = await axios.request(nextConfig);
    console.log('User profile:', profileResponse.data);

    return user;

}