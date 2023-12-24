// ChatContainer.jsx

import React from "react";
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "./FlexBetween";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTheme, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import { io } from "socket.io-client";
import { RingVolume } from "@mui/icons-material";


import "./ChatContainer.css"; // Import the CSS file for styling
import { ShoppingCartCheckoutTwoTone } from "@mui/icons-material";

const ChatContainer = ({ userId, selectedFriend, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [message, setMessage] = useState([]);
  const [inputmessage, setinputmessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isNewMessage, setIsNewMessage] = useState(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  useEffect(() => {
    const getmessage = async () => {
      try {
        // Check if selectedFriend is available
        if (selectedFriend) {
          const response = await fetch(
            `http://localhost:3001/chat/get/chat/msg/${userId}/${selectedFriend._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const responseData = await response.json();
          console.log("API Response:", responseData);
          setMessage(responseData);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getmessage();
  }, [selectedFriend, userId, token]);
  console.log("messages", message);

  useEffect(() => {
    if (ShoppingCartCheckoutTwoTone.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage(msg);
        setIsNewMessage(true);
      });
    }
  }, [arrivalMessage]);
  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, setArrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (isNewMessage) {
      // If there's a new message, set it in the messages state
      setMessage((prevMessages) => [...prevMessages, arrivalMessage]);
      setIsNewMessage(false); // Reset the new message flag
    }
  }, [arrivalMessage, isNewMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      
    }
    setIsNewMessage(false);
  }, [message]); // Include dependencies (e.g., message) if necessary
  console.log(userId);
  useEffect(() => {
    if (userId !== "") {
      socket.current = io("http://localhost:3001");
      socket.current.on("connect", () => {
        console.log("Socket connected:", socket.current.connected);
      });
      socket.current.emit("getUser", userId);
    }
  }, [userId]);

  if (!user || !selectedFriend) {
    return null; // or render a loading state
  }
  const sendmessage = async () => {
    try {
      socket.current.emit("send-msg", {
        to: userId,
        from: selectedFriend._id,
        message: inputmessage,
      });
      const response = await fetch(`http://localhost:3001/chat/msg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: userId,
          to: selectedFriend._id,
          message: inputmessage,
        }),
      });

      if (response.ok) {
        const messages = {
          myself: true,
          message: inputmessage,
        };
        setMessage(message.concat(messages));
        // Clear the input field after sending the message
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const { firstName, lastName, occupation } = user;

  return (
    <WidgetWrapper
      width="100%"
      height="80vh"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <Box>
      {isNewMessage && (
          // Show the green icon and message when there is a new message
          <div style={{ color: "green" }}>
            <Typography>New message from {selectedFriend.firstName}</Typography>
            <RingVolume />
          </div>
        )}
        {selectedFriend && (
          <Friend
            friendId={selectedFriend._id}
            name={`${selectedFriend.firstName} ${selectedFriend.lastName}`}
            subtitle={selectedFriend.occupation}
            userPicturePath={selectedFriend.picturePath}
            showButton={false}
          />
        )}
      </Box>
      <Divider />
      
      <Box
        padding="30px"
        style={{ overflowY: "auto", maxHeight: "100%" }}
        ref={scrollRef}
        className="chat-messages-container"
      >
        {message.map((item, index) => (
          <div key={index}>
            {item.myself === true ? (
              <React.Fragment key={index}>
                <div className="chat-bubble receiver">
                  <UserImage image={picturePath} />

                  <Box className="message-content">
                    <Typography>{item.message}</Typography>
                  </Box>
                </div>
              </React.Fragment>
            ) : (
              <div className="chat-bubble sender">
                {selectedFriend && (
                  <Friend
                    friendId={selectedFriend._id}
                    userPicturePath={selectedFriend.picturePath}
                    showButton={false}
                  />
                )}
                <Box className="message-content">
                  <Typography>{item.message}</Typography>
                </Box>
              </div>
            )}
          </div>
        ))}
      </Box>
      <Box
        borderRadius="1rem"
        padding="10px"
        borderColor={"black"}
        backgroundColor={"black"} // Set your desired background color
      >
        <Box display="flex" alignItems="center" color={"black"}>
          <InputBase
            placeholder="Type your message..."
            fullWidth
            onChange={(e) => setinputmessage(e.target.value)}
          />
          <div>
            <IconButton onClick={sendmessage}>
              <SendIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default ChatContainer;
