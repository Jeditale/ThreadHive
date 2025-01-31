"use server"

import { redirect } from "next/navigation"
import axios from "axios"


export async function register(prevState, formData) {

    const day = formData.get('day')
    const month = formData.get('month')
    const year = formData.get('year')

    const email = formData.get('email')
    const password = formData.get('password')
    const fname = formData.get('fname')
    const lname = formData.get('lname')
    const username = formData.get('username')
    const profile_image = formData.get('defaultPicture')
    const gender = formData.get('gender')
    const confirmPassword = formData.get('confirmPassword')
    // const createDate
    console.log(formData)

    function combineDate() {
         if(day&&month&&year){
            const formattedDate = new Date(`${year}-${month}-${day}`).toISOString();
            console.log("ISO Date:", formattedDate);

            return formattedDate;
        }

        return null

    }

    const axios = require('axios');
    
    let data = JSON.stringify({
        "usrname": username,
        "fname": fname,
        "lname": lname,
        "email": email,
        "password": confirmPassword,
        "bdate": combineDate(),
        "sex": gender,
        "profilePicture" : profile_image
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/auth/register',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    
    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });


    redirect('/login')
}