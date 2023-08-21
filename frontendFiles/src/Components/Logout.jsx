import { useState } from "react"
import { Flex, Spacer,Button,Box,ButtonGroup,Heading } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { useDisclosure,FormControl,FormLabel,Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


function Logout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

    const handleSubmit = async () => {
        

       await fetch("https://todo-dlkk.onrender.com/user/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.token) {
                    localStorage.setItem("psc_app_token", res.token)
                    localStorage.setItem("username", "")
                }
                    toast({
                        title: 'Logout Successfull',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                      })
            })
            .catch((err) => console.log(err))
                setTimeout(() => {
                    window.location.reload(false);
                }, 1000);
            }
    return <>
    <Button colorScheme='teal' onClick={onOpen}>Log Out</Button>
    <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Logout/>
        <ModalContent>
            <ModalHeader>LogOut</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {handleSubmit();onClose();}}>
                    LogOut
                </Button>  
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
}

export { Logout }