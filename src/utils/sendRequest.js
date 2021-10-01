import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const sendRequest = async (method, relativeUrl, data) => {
  const url = baseUrl + relativeUrl;

  let headers = {};
  const token = localStorage.getItem('token');

  // If the token exists it adds it to the authorization header
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });

    // If got here, request was successful
    return response.data.data;
  } catch (error) {
    // Handle errors with state when we have one!
    if (error.response) {
      // Got response from server
      const errorData = error.response.data;
      if (errorData.msg) console.error(errorData.msg);
      if (errorData.errors) console.error(errorData.errors);
    } else {
      // Communication error
      console.error("Request didn't go through");
    }
    return null;
  }
};
