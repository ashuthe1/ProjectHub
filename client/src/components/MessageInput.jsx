import {
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
// import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
import { BsFillImageFill } from "react-icons/bs";
// import usePreviewImg from "../hooks/usePreviewImg";
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
import { useSocket } from "../context/SocketContext.jsx";

const MessageInput = ({ setMessages }) => {
	const [messageText, setMessageText] = useState("");
	const showToast = useShowToast();
	const accessToken = useSelector(selectCurrentToken);
	const selectedConversation = useSelector(selectSelectedConversations);
	const dispatch = useDispatch();
	const imageRef = useRef(null);
	const { onClose } = useDisclosure();
	const { socket } = useSocket();
	// const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const [isSending, setIsSending] = useState(false);
	var conversations = useSelector(selectConversations);
	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!messageText) return;
		if (isSending) return;

		setIsSending(true);

		try {
			console.log("Message Text", messageText);
			const res = await fetch("http://localhost:8081/api/v1/messages", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					message: messageText,
					recipientId: selectedConversation.userId,
				}),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			setMessages((messages) => [...messages, data]);
			var newMessagesData = useSelector(selectCurrentMessages);
			newMessagesData = [...newMessagesData, data];
			dispatch(setMessagesdata(newMessagesData));
			
			const updatedConversations = conversations.map((conversation) => {
				if (conversation._id === selectedConversation._id) {
					return {
						...conversation,
						lastMessage: {
							text: messageText,
							sender: data.sender,
						},
					};
				}
				return conversation;
			});
			setMessageText("");
			console.log("Messageee", messageText);
			console.log("Just uske neeche")
			socket.emit("newMessage", {
				data,
			});
			const newUpdatedConversations = updatedConversations;
			dispatch(setConversationsdata(newUpdatedConversations));
			console.log("After dispathing")
			console.log("New Message", messageText);
			// setMessageText("");
			console.log("After New Message", messageText);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsSending(false);
		}
	};
	return (
		<Flex gap={2} alignItems={"center"}>
			<form onSubmit={handleSendMessage} style={{ flex: 95 }}>
				<InputGroup>
					<Input
						w={"full"}
						placeholder='Type a message'
						onChange={(e) => setMessageText(e.target.value)}
						value={messageText}
					/>
					<InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
						<IoSendSharp />
					</InputRightElement>
				</InputGroup>
			</form>
			{/* <Flex flex={5} cursor={"pointer"}>
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />
			</Flex> */}
			<Modal>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{/* <Flex mt={5} w={"full"}>
							<Image src={imgUrl} />
						</Flex> */}
						<Flex justifyContent={"flex-end"} my={2}>
							{!isSending ? (
								<IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
							) : (
								<Spinner size={"md"} />
							)}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default MessageInput;
