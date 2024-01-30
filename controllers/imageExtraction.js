import axios from 'axios';

export const imageExtraction = async (idImage) => {

const apiUrl = 'https://lemontreeflask.onrender.com/upload_image'; // Replace with your API endpoint

// Create a FormData object and append the image file
// Make a POST request to the API endpoint with the image file
    await axios.post(apiUrl,{data:idImage}, {
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error:', error.message);
        return null;
    });
}