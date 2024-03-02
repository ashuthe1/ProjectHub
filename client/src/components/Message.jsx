import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentToken} from "../features/auth/authSlice";
import { setConversationsdata, setMessagesdata } from "../features/chat/chatSlice";

const Message = ({ ownMessage, message }) => {
	const selectedConversation = "";
	const user = useAuth();
	const accessToken = useSelector(selectCurrentToken);
	const [imgLoaded, setImgLoaded] = useState(false);
	return (
		<>
			{ownMessage ? (
				<Flex gap={2} alignSelf={"flex-end"}>
					{message.text && (
						<Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
							<Text color={"black"}>{message.text}</Text>
							<Box
								alignSelf={"flex-end"}
								ml={1}
								color={message.seen ? "blue.400" : ""}
								fontWeight={"bold"}
							>
								<BsCheck2All size={16} />
							</Box>
						</Flex>
					)}
					{/* {message.img && !imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image
								src={message.img}
								hidden
								onLoad={() => setImgLoaded(true)}
								alt='Message image'
								borderRadius={4}
							/>
							<Skeleton w={"200px"} h={"200px"} />
						</Flex>
					)} */}

					{/* {message.img && imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image src={message.img} alt='Message image' borderRadius={4} />
							<Box
								alignSelf={"flex-end"}
								ml={1}
								color={message.seen ? "blue.400" : ""}
								fontWeight={"bold"}
							>
								<BsCheck2All size={16} />
							</Box>
						</Flex>
					)} */}

					{/* Will uncomment after some time*/}
					{/* <Avatar src={user.profilePicture} w='7' h={7} /> */}
				</Flex>
			) : (
				<Flex gap={2}>
					{/* Will uncomment after some time*/}
					{/* <Avatar src={selectedConversation.userProfilePicture} w='7' h={7} /> */}

					{message.text && (
						<Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"black"}>
							{message.text}
						</Text>
					)}
					{/* {message.img && !imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image
								src={message.img}
								hidden
								onLoad={() => setImgLoaded(true)}
								alt='Message image'
								borderRadius={4}
							/>
							<Skeleton w={"200px"} h={"200px"} />
						</Flex>
					)} */}

					{/* {message.img && imgLoaded && (
						<Flex mt={5} w={"200px"}>
							<Image src={message.img} alt='Message image' borderRadius={4} />
						</Flex>
					)} */}
				</Flex>
			)}
		</>
	);
};

export default Message;
