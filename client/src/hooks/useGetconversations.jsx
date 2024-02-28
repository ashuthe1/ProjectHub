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

    var lastMessages;
    axios(config).then(function (response) {
        // console.log(JSON.stringify(response.data));
        const data = response.data;
        console.log(data[0].lastMessage);
        lastMessages = data[0].lastMessage.text;
        // console.log('lastMessage', lastMessages)
        // const sender = response.data.lastMessage.sender;
        return {lastMessage2: lastMessages};
    })
    .catch(function (error) {
        console.log(error);
        return;
    });
    return {lastMessage2: lastMessages};
  }

  return null;
};
export default useGetconversation;
