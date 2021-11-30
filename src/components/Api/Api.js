import axios from "axios";

const baseUrl = 'https://api-dev.mfind.pl/cars';

export const getData = path => {
  return axios.get(`${baseUrl}${path}`, {
    headers: {
      'Authorization': 'Basic YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5'
    }
  });
}