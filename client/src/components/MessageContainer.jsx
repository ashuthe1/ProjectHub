import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentToken} from "../features/auth/authSlice";
import { useSocket } from "../context/SocketContext.jsx";
import messageSound from "../assets/sounds/message.mp3";
import useAuth from "../hooks/useAuth";

const MessageContainer = ({selectedConversation}) => {
	const showToast = useShowToast();
	const accessToken = useSelector(selectCurrentToken);
	// const selectedConversation = useState({});
	const [loadingMessages, setLoadingMessages] = useState(true);
	const [messages, setMessages] = useState([]);
	const currentUser = useAuth();
	const { socket } = useSocket();
	const setConversations = useState([]);
	const messageEndRef = useRef(null);

	useEffect(() => {
		socket.on("newMessage", (message) => {
			if (selectedConversation._id === message.conversationId) {
				setMessages((prev) => [...prev, message]);
			}

			// make a sound if the window is not focused
			if (!document.hasFocus()) {
				const sound = new Audio(messageSound);
				sound.play();
			}

			setConversations((prev) => {
				const updatedConversations = prev.map((conversation) => {
					if (conversation._id === message.conversationId) {
						return {
							...conversation,
							lastMessage: {
								text: message.text,
								sender: message.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
		});

		return () => socket.off("newMessage");
	}, [socket, selectedConversation, setConversations]);

	useEffect(() => {
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== currentUser.userId;
		if (lastMessageIsFromOtherUser) {
			socket.emit("markMessagesAsSeen", {
				conversationId: selectedConversation._id,
				userId: selectedConversation.userId,
			});
		}

		socket.on("messagesSeen", ({ conversationId }) => {
			if (selectedConversation._id === conversationId) {
				setMessages((prev) => {
					const updatedMessages = prev.map((message) => {
						if (!message.seen) {
							return {
								...message,
								seen: true,
							};
						}
						return message;
					});
					return updatedMessages;
				});
			}
		});
	}, [socket, currentUser.userId, messages, selectedConversation]);

	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		const getMessages = async () => {
			setLoadingMessages(true);
			setMessages([]);
			try {
				if (selectedConversation.mock) return;
				// const res = await fetch(`/api/messages/${selectedConversation.userId}`);
				console.log("User Id", selectedConversation.userId);
				const res = await axios.get(
					`http://localhost:8081/api/v1/messages/${selectedConversation.userId}`,
					{
					  headers: {
						Authorization: `Bearer ${accessToken}`
					  }
					}
				  );
				  
				const data = response.data;
				if (data.error) {
					// Handle error if needed
					showToast("Error", data.error, "error");
					return;
				}
				setMessages(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoadingMessages(false);
			}
		};
		getMessages();
	}, [selectedConversation.userId, selectedConversation.mock]);

	console.log("Messages from selected conversation: ", messages);
	return (
		<Flex
			flex='70'
			bg={useColorModeValue("gray.200", "gray.dark")}
			borderRadius={"md"}
			p={2}
			flexDirection={"column"}
		>
			{/* Message header */}
			<Flex w={"full"} h={12} alignItems={"center"} gap={2}>
				<Avatar src={selectedConversation.userProfilePic} size={"sm"} />
				<Text display={"flex"} alignItems={"center"}>
					{selectedConversation.username} <Image src='/verified.png' w={4} h={4} ml={1} />
				</Text>
			</Flex>

			<Divider />

			<Flex flexDir={"column"} gap={4} my={4} p={2} height={"400px"} overflowY={"auto"}>
				{loadingMessages &&
					[...Array(5)].map((_, i) => (
						<Flex
							key={i}
							gap={2}
							alignItems={"center"}
							p={1}
							borderRadius={"md"}
							alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
						>
							{i % 2 === 0 && <SkeletonCircle size={7} />}
							<Flex flexDir={"column"} gap={2}>
								<Skeleton h='8px' w='250px' />
								<Skeleton h='8px' w='250px' />
								<Skeleton h='8px' w='250px' />
							</Flex>
							{i % 2 !== 0 && <SkeletonCircle size={7} />}
						</Flex>
					))}

				{!loadingMessages &&
					messages.map((message) => (
						<Flex
							key={message._id}
							direction={"column"}
							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
						>
							<Message message={message} ownMessage={currentUser.userId === message.sender} />
						</Flex>
					))}
			</Flex>

			<MessageInput setMessages={setMessages} />
		</Flex>
	);
};

export default MessageContainer;
