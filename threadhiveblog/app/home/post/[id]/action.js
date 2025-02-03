"use server"

export async function postComment(prevState, formData) {
    
    const userToken = formData.get("userToken")
    const userId = parseInt(formData.get('userId'), 10); 
    const comment = formData.get("comment")
    const postId = parseInt(formData.get("postId"), 10)

    const axios = require('axios');
    let data = JSON.stringify({
      "postId": postId,
      "userId": userId,
      "comment": comment
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/post-comments',
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
      
}