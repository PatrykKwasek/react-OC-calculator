import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const getData = path => {
  return axios.get(`${baseUrl}${path}`, {
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTHORIZATION}`
    }
  });
}