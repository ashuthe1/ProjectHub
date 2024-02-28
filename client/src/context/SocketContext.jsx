import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const user = useAuth();

	useEffect(() => {
		const socket = io("http://localhost:8081", {
			query: {
				userId: user?._id,
			},
		});

		setSocket(socket);

		socket.on("getOnlineUsers", (users) => {
			setOnlineUsers(users);
		});
		return () => socket && socket.close();
	}, [user?._id]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
