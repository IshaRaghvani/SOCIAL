// Chat.jsx
import React, { useState } from "react";
import Contact from "components/Contact";
import ChatContainer from "components/ChatContainer";
import { Typography } from "@mui/material";
import NavBar from "scenes/navbar";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledFlexBetween = styled.div`
  display: flex;
  padding: 2rem;
  
  align-items: flex-start;
  gap: 16px; // Adjust the gap between components
  overflow-y: none;
`;

const Chat = () => {
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const { _id, picturePath } = useSelector((state) => state.user);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleOnMessageIconClick = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <>
      <NavBar />
      <StyledFlexBetween>
        <Contact userId={_id} onMessageIconClick={handleOnMessageIconClick} />
        <ChatContainer userId={_id} selectedFriend={selectedFriend} picturePath={picturePath} />
      </StyledFlexBetween>
    </>
  );
};

export default Chat;
