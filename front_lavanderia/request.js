import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



 
axios.defaults.baseURL = 'https://4f9dxrb9-4001.usw3.devtunnels.ms/';
axios.defaults.headers.common['Authorization'] = "Bearer " + AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Siempre se ejecutara antes de hacer la peticion
axios.interceptors.request.use(async (config)=> {
    // Do something before request is sent
    const token= await AsyncStorage.getItem("token");

    if(token){
        config.headers.Authorization= `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor

// esto inmediatamente de ejecutar una respuesta 
axios.interceptors.response.use(
    (response)=> response,
     async(error)=>{
        if(error.response && error.response.status === 401){
            await AsyncStorage.removeItem("token")
            window.location.href="/"
        }

        return Promise.reject(error);

    }

  );