import './App.css';
import { Link
} from "react-router-dom";
import { Flex,Button,Box,ButtonGroup,Heading } from '@chakra-ui/react'
import { Login } from "./Components/Login"
import { Register } from "./Components/Register"
import { Notes } from './Components/Notes';
import { Logout } from './Components/Logout';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'


function App() {
  const toast = useToast();
  const usernam = localStorage.getItem("username")
  const [username,setusername] = useState(usernam)
  useEffect(()=>{
    if(username){
      toast({
        title: 'Login Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  },[username])
  return (
    <div className="App">
      <Flex maxWidth="100%" alignItems='center' justifyContent={"space-around"} gap='2' backgroundColor={"blackAlpha.100"}>
        <Box p='2'>
          <Link to="/"><Heading size='xl' color={"orange.400"}>Todo App</Heading></Link>
        </Box>
        <ButtonGroup gap='5'>
          {username?<><Button colorScheme='teal' >{username}</Button>
          <Logout/></>:
          <><Register/>
          <Login/></>}
        </ButtonGroup>
      </Flex>
      <Notes/>
    </div>
  );
}

export default App;
