import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
    const {user}=ChatState();
  

  return (
    <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box d="flex" justifyContent='space-between' w="100%" h="91.5vh" p="10px" style={{display:"flex",justifyContent:"space-between",width:"100%", height:"91.5vh",padding:"10px"}}
        >
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        </Box>
        
    </div>
  )
}

export default Chatpage