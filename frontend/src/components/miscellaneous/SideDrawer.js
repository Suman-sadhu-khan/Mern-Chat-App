import { BellIcon, ChevronDownIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons';
import { Box ,Text,Button ,Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer,DrawerBody, DrawerContent,  DrawerHeader,  DrawerOverlay, useDisclosure, Input, Spinner} from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge from './NotificationBadge';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    
    const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

    const toast = useToast();
    
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

     const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!search) {
        toast({
            title: "Please Enter something in search",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
        });
        return;
        }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data)
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };



  return (
    <>
        <Box
        sx={{
            display: "flex !important",
            justifyContent: "space-between !important",
            alignItems: "center !important"
        }}
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
            <Tooltip label="Search User to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <SearchIcon/>
                    <Text d={{ base: "none", md: "flex" }} sx={{ display: { base: "none !important", md: "flex !important" } }} px={4} >
                        Search User
                    </Text>
                </Button>   
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
                Chat-Hub
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                      <div>
                       
                        <NotificationBadge count={notification.length} />
                      </div>
                        {/* <NotificationBadge
                        count={notification.length}
                        effect={Effect.SCALE}
                        /> */}
                        {/* <BellIcon fontSize="2xl" m={1} /> */}
                    </MenuButton>
                    <MenuList pl={2}>
                        {!notification.length && "No New Message"}
                        {notification.map(noti=>(
                          <MenuItem key={noti._id} onClick={()=>{setSelectedChat(noti.chat)
                          setNotification(notification.filter((n)=>n!==noti))
                          }}>
                            {noti.chat.isGroupChat?`New Message in ${noti.chat.chatName}`:`New Message from ${getSender(user,noti.chat.users)}`}

                          </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                        <Avatar
                            size="sm"
                            cursor="pointer"
                            name={user.name}
                            src={user.pic}
                        />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                        <MenuItem>My Profile</MenuItem>
                        </ProfileModal>

                        <MenuDivider />

                        <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>

        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box sx={{
                    display: "flex !important",
                    paddingBottom: "2px !important",
                    marginBottom:"10px !important"
                }}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}><Search2Icon/></Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" style={{marginLeft:"auto",display:"flex"}} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer

