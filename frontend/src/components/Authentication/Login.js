import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [show,setShow]=useState(false);
    const [loading, setLoading] = useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:"",
        
    });
     const toast = useToast();
    const navigate = useNavigate();

    const submitHandler=async()=>{
        setLoading(true);
        if (!formData.email || !formData.password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
         try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { 
            email:formData.email,
            password:formData.password
        },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    }

  return (
    <VStack spacing="5px" color="black">
       
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>

            <Input  type='email' name="email" value={formData.email} placeholder='Enter Your Email' onChange={(event)=>setFormData({ ...formData, email: event.target.value })}/>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup>
                <Input name="password" value={formData.password} type={show?"text":"password"} placeholder='Enter Your Password' onChange={(event)=>setFormData({ ...formData, password: event.target.value })}/>

                <InputRightElement width="4.5rem">
                    <div h="1.75rem" size="sm" onClick={()=>{setShow(!show)}}>
                        {
                            show?<ViewOffIcon/>:<ViewIcon/>
                        }
                    </div>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
            Login
        </Button>

        <Button varient="solid" colorScheme='green' width="100%" style={{marginTop:15}} onClick={()=>{
            setFormData({ ...formData,email:"guest@suman.com", password: "1234"})
        }}>
           Get Guest User Credentials
        </Button>

    </VStack>
  )
}

export default Login
