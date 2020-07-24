import axios from "axios";

const apiKey = "AIzaSyC5s2gifIGk-fZqN6hlCXCxruech3a0WEQ";
const authAxios = axios.create({baseURL: 'https://identitytoolkit.googleapis.com/v1'});
export {apiKey, authAxios};

