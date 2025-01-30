"use server"

import { redirect } from "next/navigation"

export async function create(prevState, formData) {
    const title = formData.get('title')
    const details = formData.get('details')
    const imageUrl = formData.get('imageUrl')
    const userId = formData.get('userId')
    const userToken = formData.get('userToken')

    console.log(formData)
    
    const axios = require('axios');
    let data = JSON.stringify({
        "title": title,
        "tags": [
            "string"
        ],
        "details": details,
        "image": imageUrl,
        "userId": userId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/posts',
        headers: { 
            'mode':'cors',
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${userToken}`
        },
        data : data
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return { success: true, data: response.data };
        
    } catch (error) {
        console.log(error);  
    }
    

}