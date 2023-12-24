import FlexBetween from "./FlexBetween";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "state";
import Friend from "./Friend";
import { Message } from "@mui/icons-material";
import { useEffect } from "react";
import ChatContainer from "./ChatContainer";

const Contact = ({ userId, onMessageIconClick }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // State to store the selected friend for chat
  const [selectedFriend, setSelectedFriend] = useState(null);

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  

  useEffect(() => {
    getFriends(); // Fetch user's friends
  }, [userId, token]);
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Set the first friend as the default selected friend
    if (friends.length > 0 && !selectedFriend) {
      setSelectedFriend(friends[0]);
    }
  }, [friends, selectedFriend]);
  

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  // Function to handle friend click and set the selectedFriend state
  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };
  // Function to handle chat icon click
  

  return (
    <WidgetWrapper height="100%">
      <FlexBetween padding="2rem" gap="1.75rem">
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            height="100%"
          >
            <InputBase placeholder="Search your friends..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <FlexBetween key={friend._id}>
            <Friend
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              showButton={false}
              onClick={() => handleFriendClick(friend)}
            />
            <Message onClick={() => onMessageIconClick(friend)} />
          </FlexBetween>
        ))}
      </Box>
      {selectedFriend && (
        <Box>
          
          <Typography>{selectedFriend.name}</Typography>
          <img src={selectedFriend.userPicturePath}  />
          {/* Add more chat components here */}
        </Box>
      )}
      
      {userId !== ''?
      <ChatContainer userId={userId}/>:<div>
      <p>Open your chat message with our friends</p>
      
      </div>
      }
      
    </WidgetWrapper>
  );
};

export default Contact;
