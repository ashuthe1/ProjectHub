import {
	Avatar,
	AvatarBadge,
	Box,
	Flex,
	Image,
	Stack,
	Text,
	WrapItem,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react"
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

import axios from "axios";
import useAuth from "../hooks/useAuth";
import {selectCurrentToken} from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setConversationsdata, 
	setSelectedConversationsdata, 
	setMessagesdata,
	selectConversations,
	selectSelectedConversations,
	selectCurrentMessages,
 } 
from "../features/chat/chatSlice";

const Conversation = ({ conversation, isOnline }) => {
	const user = conversation.participants[0];
	const dispatch = useDispatch();
	const currentUser = useAuth();
	const showToast = useShowToast();
	const accessToken = useSelector(selectCurrentToken);
	const lastMessage = conversation.lastMessage;
	const selectedConversation = useSelector(selectSelectedConversations);
	const [changed, setChanged] = useState(false);
	const colorMode = useColorMode();

	const getMessages = async () => {
		try {
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
				showToast("Error", data.error, "error");
				return;
			}
			dispatch(setMessagesdata(data));
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			// do something
		}
	};
	function handleSelectedConversation() {
		const tempData = {
			_id: conversation._id,
			userId: user._id,
			userProfilePicture: user.ProfilePicture,
			name: user.name,
			mock: conversation.mock,
		};
		console.log("Step 1")
		dispatch(setSelectedConversationsdata(tempData));
		getMessages();
		setChanged(true);
	};
	console.log("selectedConverstion", selectedConversation);
	return (
		<Flex
			gap={4}
			alignItems={"center"}
			p={"1"}
			_hover={{
				cursor: "pointer",
				bg: useColorModeValue("gray.600", "gray.dark"),
				color: "white",
			}}
			onClick={handleSelectedConversation}
			bg={
				selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
			}
			borderRadius={"md"}
		>
			<WrapItem>
				{/* <Avatar
					size={{
						base: "xs",
						sm: "sm",
						md: "md",
					}}
					// src={user.profilePicture}
				>
					{isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
				</Avatar> */}
			</WrapItem>

			<Stack direction={"column"} fontSize={"sm"}>
				<Text fontWeight='700' display={"flex"} alignItems={"center"}>
					{user.name} <Image src='/verified.png' w={4} h={4} ml={1} />
				</Text>
				<Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
					{currentUser.userId === lastMessage.sender ? (
						<Box color={lastMessage.seen ? "blue.400" : ""}>
							<BsCheck2All size={16} />
						</Box>
					) : (
						""
					)}
					{lastMessage.text.length > 18
						? lastMessage.text.substring(0, 18) + "..."
						: lastMessage.text || <BsFillImageFill size={16} />}
				</Text>
			</Stack>
		</Flex>
	);
};

export default Conversation;
