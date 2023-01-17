import React from 'react'
import smallogo from '../images/smallogo.png'
import Capture from '../images/Capture.JPG'

import whitelogo from '../images/whitelogo.png'
import {MdAccountCircle} from 'react-icons/md'
import {Link,useNavigate} from 'react-router-dom'
import { Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {IoAdd, IoMoon, IoSearch, IoSunny} from 'react-icons/io5'
import { Button, ButtonGroup } from '@chakra-ui/react'
const Navbar = ({user}) => {
    const {colorMode,toggleColorMode}=useColorMode();
    const bg=useColorModeValue("gray.600","gray.300")

    const navigate=useNavigate();


  return (
    <Flex
    justifyContent={'space-between'}
    alignItems="center"
    width={"100vw"}
  p={4}
    
    >
        <Link to={"/"} >
          <Image src={colorMode=='light'?smallogo:whitelogo} width={"100px"}/>
        </Link>
      
        <InputGroup mx={6} width ='60vw' >
        /*Set margin to 6 on both left and right*/
    <InputLeftElement
      pointerEvents='none'
      children={< IoSearch color='gray.300'  fontSize={25}/>}
    />
    <Input type='tel' placeholder='Search' fontSize={18} variant={'filled'}/>
  </InputGroup>
  
  <Flex
  justifyContent={'center'} alignContent='center'>
    <Flex width='40px' height='40px' 
    justifyContent={'center'}
    alignItems={'center'}
    cursor={'pointer'}
    borderRadius='5px'>
      {colorMode=='light'?<IoMoon fontSize={25} onClick={toggleColorMode}/>:<IoSunny fontSize={25} onClick={toggleColorMode}/>}
    </Flex>
    
    {/* {Create Button} */}
    <Link to={'/create'}>
      <Flex  justifyContent={'center'} alignItems={'center'} bg={bg} mt={'2'} mx={'6'}
       transition="ease-in-out"
       borderRadius="5px"
       transitionDuration={"0.3s"}>
        <IoAdd fontSize={25}
        color={`${colorMode=='dark'?"#111":"#f1f1f1"}`}
       
        />
      </Flex>
      </Link>
    
      <Menu>
  <MenuButton>
    <MdAccountCircle fontSize={'25px'}/>
  </MenuButton>
  <MenuList>
   <Link to={`/userDetail/${user.uid}`}>
<MenuItem> My Account</MenuItem>
    </Link>
    <Link to={"/login"} >
<MenuItem  onClick={() => {
                localStorage.clear();
                // navigate("/login", { replace: true });
               
              }}>Logout</MenuItem>
    </Link>
    
  </MenuList>
</Menu>
     
   
      
  </Flex>

    </Flex>
  )
}

export default Navbar