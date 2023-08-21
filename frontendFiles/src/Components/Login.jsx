import { useState } from "react"
import { Flex, Spacer,Button,Box,ButtonGroup,Heading } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { useDisclosure,FormControl,FormLabel,Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {
        if (email == "" || password == "") {
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
        }

       await fetch("https://todo-dlkk.onrender.com/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.token) {
                    localStorage.setItem("psc_app_token", res.token)
                    localStorage.setItem("username", res.name)
                    window.location.reload(false);
                }
                onClose();
            })
            .catch((err) => console.log(err))
    const username = localStorage.getItem("username")
console.log('**********',username);
        if(!username){
            toast({
                title: 'Invalid credentials',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }}
    }
    return <>
    <Button colorScheme='teal' onClick={onOpen}>Log in</Button>
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Login/>
        
          
      
        <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
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
                <Button colorScheme='blue' mr={3} onClick={() => {handleSubmit();}}>
                    Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
}

export { Login }