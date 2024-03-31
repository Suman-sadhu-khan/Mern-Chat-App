import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [show,setShow]=useState(false);
    const [confirmPShow,setConfirmPShow]=useState(false);
    const [loading,setLoading]=useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        
    });
    const [pic, setPic] = useState();
    

    const postDetails=(pics)=>{
        setLoading(true);
        if(pics===undefined){
            toast({
                title: 'Account created.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            });
            return;
        }

        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatHub");
      data.append("cloud_name", "dmrgebebk");
      fetch("https://api.cloudinary.com/v1_1/dmrgebebk/image/upload", {
        method: "post",
        body: data,
       }).then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        }).catch((err) => {
          console.log(err);
          setLoading(false);
        });
         } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    }

    const submitHandler=async()=>{
        setLoading(true);
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
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

         if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(formData.name, formData.email, formData.password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        
        {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            pic: pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
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
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>

            <Input type='text'name="name" value={formData.name} placeholder='Enter Your Name' onChange={(event)=>setFormData({ ...formData, name: event.target.value })}/>
        </FormControl>

        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>

            <Input  name="email" value={formData.email} type='email' placeholder='Enter Your Email' onChange={(event)=>setFormData({ ...formData, email: event.target.value })}/>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>

            <InputGroup>
                <Input  name="password" value={formData.password} type={show?"text":"password"} placeholder='Enter Your Password' onChange={(event)=>setFormData({ ...formData, password: event.target.value })}/>

                <InputRightElement width="4.5rem">
                    <div h="1.75rem" size="sm" onClick={()=>setShow(!show)}>
                        {
                            show?<ViewOffIcon/>:<ViewIcon/>
                        }
                    </div>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="ConfirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>

            <InputGroup>
                <Input  name="confirmPassword" value={formData.confirmPassword} type={confirmPShow?"text":"password"} placeholder='Enter Your Password' onChange={(event)=>setFormData({ ...formData, confirmPassword: event.target.value })}/>

                <InputRightElement width="4.5rem">
                    <div  onClick={()=>{
                    setConfirmPShow(!confirmPShow)}}>
                        {
                            confirmPShow?<ViewOffIcon/>:<ViewIcon/>
                        }
                    </div>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="pic" isRequired>
            <FormLabel>Upload Your Picture</FormLabel>

            <Input  type='file' 
            p={1.5}
            accept="image/*" onChange={(event)=>postDetails(event.target.files[0])}/>
        </FormControl>

        <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
            Sign Up
        </Button>

    </VStack>
  )
}

export default SignUp