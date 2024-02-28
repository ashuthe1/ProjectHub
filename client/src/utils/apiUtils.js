import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
const baseUrl = import.meta.env.VITE_SOCKET_SERVER_BASE_URL;

const config = {
    method: 'post',
    url: `${baseUrl}/messages`,
    headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },
    data: data
};

// Making the Axios POST request
axios(config).then(function (response) {
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    console.log(error);
});