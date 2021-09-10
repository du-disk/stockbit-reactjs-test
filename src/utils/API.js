import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = `${API_URL}`;

axios.interceptors.response.use(
  (response) => {

    if (response.data.Response === "FALSE") {
      alert(response.data.Error);
    }

    return response
  },
  error => {
    alert('Oops! There is something wrong!')
    return Promise.reject(error)
  },
)


export default axios
