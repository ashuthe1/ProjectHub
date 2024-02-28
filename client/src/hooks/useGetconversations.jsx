import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
const baseUrl = import.meta.env.VITE_SOCKET_SERVER_BASE_URL;

const useGetconversation = () => {
  const accessToken = useSelector(selectCurrentToken);

  if (accessToken) {
    const config = {
        method: 'GET',
        url: `${baseUrl}/messages/conversations`,
        headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    };

    var lastMessages = "Nothing yet";
    axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        const data = JSON.stringify(response.data)
        console.log(data);
        // console.log(data[0].lastMessage);
        // lastMessages = data[0].lastMessage.text;
        // console.log('lastMessage', lastMessages)
        // const sender = response.data.lastMessage.sender;
        console.log("1st step")
        return {lastMessage2: lastMessages};
        console.log("2nd step")
    })
    .catch(function (error) {
        console.log("3rd step")
        console.log(error);
        return;
        console.log("4th step")
    });
    console.log("5th step")
    return {lastMessage2: "Hello!"};
  }

  return null;
};
export default useGetconversation;
