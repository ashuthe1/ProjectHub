import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
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
import MessageContainer from "../../components/MessageContainer";
import { setConversationsdata, 
	setSelectedConversationsdata, 
	setMessagesdata,
	selectConversations,
	selectSelectedConversations,
	selectCurrentMessages,
 }  from "../../features/chat/chatSlice";

const ChatPage = () => {
	const showToast = useShowToast();
	const dispatch = useDispatch();
	const accessToken = useSelector(selectCurrentToken);
	const selectedConversation = useSelector(selectSelectedConversations);
	const conversations = useSelector(selectConversations);
	const currentUser = useAuth();
	const [loadingConversations, setLoadingConversations] = useState(true);
	// const [selectedConversation, setSelectedConversation] = useState({});
	// const [conversations, setConversations] = useState([]);
	const { socket, onlineUsers } = useSocket();

	useEffect(() => {
		socket?.on("messagesSeen", ({ conversationId }) => {
			var prev = useSelector(selectConversations);
			// dispatch(setConversationsdata((prev) => {
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
			prev = updatedConversations;
			dispatch(setConversationsdata(prev));
		});
	}, [socket, setConversationsdata]);

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
				dispatch(setConversationsdata(data));
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoadingConversations(false);
			}
		};

		getConversations();
	}, [showToast, setConversationsdata]);

	console.log('Conversations: ', conversations);

	return (
		<Box
			position={"absolute"}
			left={"50%"}
			w={{ base: "100%", md: "80%", lg: "750px" }}
			p={4}
			transform={"translateX(-50%)"}
		>
			<Flex
				gap={4}
				flexDirection={{ base: "column", md: "row" }}
				maxW={{
					sm: "400px",
					md: "full",
				}}
				mx={"auto"}
			>
				<Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
					<Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
						Your Conversations
					</Text>

					{loadingConversations &&
						[0, 1, 2, 3, 4].map((_, i) => (
							<Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
								<Box>
									<SkeletonCircle size={"10"} />
								</Box>
								<Flex w={"full"} flexDirection={"column"} gap={3}>
									<Skeleton h={"10px"} w={"80px"} />
									<Skeleton h={"8px"} w={"90%"} />
								</Flex>
							</Flex>
						))}

					{!loadingConversations && conversations &&
						conversations.map((conversation) => (
							// console.log(conversation._id)
							<Conversation
								key={conversation._id}
								isOnline={true}
								conversation={conversation}
							/>
						))}
				</Flex>
				{!selectedConversation?._id && (
					<Flex
						flex={70}
						borderRadius={"md"}
						p={2}
						flexDir={"column"}
						alignItems={"center"}
						justifyContent={"center"}
						height={"400px"}
					>
						<GiConversation size={100} />
						<Text fontSize={20}>Select a conversation to start messaging</Text>
					</Flex>
				)}

				{selectedConversation?._id && <MessageContainer />}
			</Flex>
		</Box>
	);
};

export default ChatPage;
