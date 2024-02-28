import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
// import useGetconversation from "../../hooks/useGetconversations";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi"
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
const baseUrl = import.meta.env.VITE_SOCKET_SERVER_BASE_URL;
import Conversation from "../../components/Conversation";
import useShowToast from "../../hooks/useShowToast";

const ChatPage = () => {
	const showToast = useShowToast();

	const accessToken = useSelector(selectCurrentToken);
	const currentUser = useAuth();
	const [searchingUser, setSearchingUser] = useState(false);
	const [loadingConversations, setLoadingConversations] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [selectedConversation, setSelectedConversation] = useState();
	const [conversations, setConversations] = useState([]);
	const { socket, onlineUsers } = useSocket();

	useEffect(() => {
		socket?.on("messagesSeen", ({ conversationId }) => {
			setConversations((prev) => {
				const updatedConversations = prev.map((conversation) => {
					if (conversation._id === conversationId) {
						return {
							...conversation,
							lastMessage: {
								...conversation.lastMessage,
								seen: true,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
		});
	}, [socket, setConversations]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await fetch("http://localhost:8081/api/v1/messages/conversations", {
					headers: {
						Authorization: `Bearer ${accessToken}` // Replace accessToken with your actual access token
					}
				});
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setConversations(data);
				console.log('Data: ', data);
				console.log('Conversations: ', conversations);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoadingConversations(false);
			}
		};

		getConversations();
	}, [accessToken]);

	return (
		<>
		<h1>Chat Page...</h1>
		<button> Get Conversations </button>
		</>
		// <Box
		// 	position={"absolute"}
		// 	left={"50%"}
		// 	w={{ base: "100%", md: "80%", lg: "750px" }}
		// 	p={4}
		// 	transform={"translateX(-50%)"}
		// >
		// 	<Flex
		// 		gap={4}
		// 		flexDirection={{ base: "column", md: "row" }}
		// 		maxW={{
		// 			sm: "400px",
		// 			md: "full",
		// 		}}
		// 		mx={"auto"}
		// 	>
		// 		<Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
		// 			<Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
		// 				Your Conversations
		// 			</Text>

		// 			{loadingConversations &&
		// 				[0, 1, 2, 3, 4].map((_, i) => (
		// 					<Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
		// 						<Box>
		// 							<SkeletonCircle size={"10"} />
		// 						</Box>
		// 						<Flex w={"full"} flexDirection={"column"} gap={3}>
		// 							<Skeleton h={"10px"} w={"80px"} />
		// 							<Skeleton h={"8px"} w={"90%"} />
		// 						</Flex>
		// 					</Flex>
		// 				))}

		// 			{!loadingConversations &&
		// 				conversations.map((conversation) => (
		// 					<Conversation
		// 						key={conversation._id}
		// 						isOnline={onlineUsers.includes(conversation.participants[0]._id)}
		// 						conversation={conversation}
		// 					/>
		// 				))}
		// 		</Flex>
		// 		{!selectedConversation._id && (
		// 			<Flex
		// 				flex={70}
		// 				borderRadius={"md"}
		// 				p={2}
		// 				flexDir={"column"}
		// 				alignItems={"center"}
		// 				justifyContent={"center"}
		// 				height={"400px"}
		// 			>
		// 				<GiConversation size={100} />
		// 				<Text fontSize={20}>Select a conversation to start messaging</Text>
		// 			</Flex>
		// 		)}

		// 		{selectedConversation._id && <MessageContainer />}
		// 	</Flex>
		// </Box>
	);
};

export default ChatPage;
