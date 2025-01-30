"use server"

export async function fetch(prevState) {
    const axios = require('axios');
    let data = ''

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://threadhive.onrender.com/posts',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        const results = JSON.stringify(response.data)
        return results
    })
    .catch((error) => {
        console.log(error);
    });

}