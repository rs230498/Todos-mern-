import { useState } from "react";
import { Flex, Spacer, Button, Box, ButtonGroup, Heading } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = () => {
    console.log('********',email,
    password,
    age);
    if (email == "" || password == "" || age == "") {
      toast({
        title: 'Fill all the Details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    else{
    const payload = {
      email,
      password,
      User: age
    }

    fetch("https://todo-dlkk.onrender.com/user/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        toast({
          title: 'Registered Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose();
        setPassword("")
        setEmail("")
        setAge("")
      })
      .catch((err) => console.log(err))}
  }
  return <>
  {/* {robin && <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Fill all the Details</AlertTitle>
      </Alert>} */}
    <Button colorScheme='teal' onClick={onOpen}>Register</Button>
    
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <Register />



      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mt={4}>
            <FormLabel>User Name</FormLabel>
            <Input type="text" placeholder="User name" onChange={(e) => setAge(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="text" placeholder="pwd" onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => { handleSubmit();  }}>
            Register
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export { Register }