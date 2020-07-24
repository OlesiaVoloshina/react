import axios from "axios";

let apiAxios = axios.create({baseURL: 'https://mywishes-844fd.firebaseio.com/'});

apiAxios.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem('token');
        if(!config.headers) {
            config.headers = {};
        }
        config.headers.common["Content-Type"] = "application/json";
        config.headers.common["Access-Control-Allow-Origin"] = "*";

        if(!config.params) {
            config.params = {};
        }
        //config.params['auth'] = token;
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default apiAxios;
