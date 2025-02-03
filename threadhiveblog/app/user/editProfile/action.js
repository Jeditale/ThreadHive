"use server"

import axios from "axios"
import { redirect } from "next/navigation"


export async function editProfile(prevState, formData) {

    const day = formData.get('day')
    const month = formData.get('month')
    const year = formData.get('year')

    const email = formData.get('email')
    const fname = formData.get('fname')
    const lname = formData.get('lname')
    const username = formData.get('username')
    const profile_image = formData.get('profile_image')
    const gender = formData.get('gender')
    const userId = parseInt(formData.get('userId'), 10); 
    const userToken = formData.get('userToken')
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
        "fname": fname,
        "lname": lname,
        "profilePicture": profile_image,
        "email": email,
        "bdate": combineDate(),
        "sex": gender,
        "usrname": username
      });

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/${userId}`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
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

    redirect('/user')

}