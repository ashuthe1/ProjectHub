import React from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useGetconversation from "../../hooks/useGetconversations";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import { GiConversation } from "react-icons/gi"
import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
const baseUrl = import.meta.env.VITE_SOCKET_SERVER_BASE_URL;

const ChatPage = () => {
	// const currentUser = useAuth();
	const accessToken = useSelector(selectCurrentToken);
	const currentUser = accessToken;
	const [searchingUser, setSearchingUser] = useState(false);
	const [loadingConversations, setLoadingConversations] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [selectedConversation, setSelectedConversation] = useState({});
	const [conversations, setConversations] = useState([]);
	const { socket, onlineUsers } = useSocket();
	// console.log("ChatPage", accessToken);

	async function sendMessage() {
		const data = {
			recipientId: "65cb35f5329453f256d7617f",
			message: "Message from Frontend 2!"
		};

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
	}

	async function handleConversationSearch() {
		const data = useGetconversation();
		const data2 = useAuth();
		console.log(data);
	}

	handleConversationSearch();
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
					<form onSubmit={handleConversationSearch}>
						<Flex alignItems={"center"} gap={2}>
							<Input placeholder='Search for a user' onChange={(e) => setSearchText(e.target.value)} />
							<Button size={"sm"} onClick={handleConversationSearch} isLoading={searchingUser}>
								<SearchIcon />
							</Button>
						</Flex>
					</form>

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

					{!loadingConversations &&
						conversations.map((conversation) => (
							<Conversation
								key={conversation._id}
								isOnline={onlineUsers.includes(conversation.participants[0]._id)}
								conversation={conversation}
							/>
						))}
				</Flex>
				{!selectedConversation._id && (
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

				{selectedConversation._id && <MessageContainer />}
			</Flex>
		</Box>
	);
};
	// return (
	// 	<>
	// 	<h1>Chat Page...</h1>
	// 	<form>
	// 		<input type="text" />
	// 		<button onClick={sendMessage}>Send</button>
	// 	</form>
	// 	</>
	// );
// };

export default ChatPage;
