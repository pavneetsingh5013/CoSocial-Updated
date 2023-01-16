import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import logo from '../images/logo.png'
import { Box } from '@chakra-ui/react'
import {FcGoogle} from 'react-icons/fc'
import { Center, Square, Circle } from '@chakra-ui/react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {firebaseApp} from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import {doc,getFirestore,setDoc} from "firebase/firestore";

const Login = () => {
  const auth = getAuth(firebaseApp);
  const provider=new GoogleAuthProvider();
  const navigate=useNavigate();
  const firebaseDb=getFirestore(firebaseApp);

    const login=async()=>{
    const {user}=await signInWithPopup(auth,provider);
      console.log(user);
      const{refreshToken , providerData}=user;
      console.log(refreshToken);
      console.log(providerData);
      localStorage.setItem("user",JSON.stringify(providerData));
      localStorage.setItem("accessToken",JSON.stringify(refreshToken));
      await setDoc(
        doc(firebaseDb, "users",providerData[0].uid),
        providerData[0]
        );
      navigate("/",{replace:true});
 
        
    };

  return (
    <Flex marginTop={20}  bg='#C6F6D5'>
   
    <Flex justifyContent='center' alignItems='center' mt={20} width={'100vw'} height={'50vh'} position ={'relative'}>
        <Card maxW='sm' >
            
            
  <CardBody shadow="outline" rounded='md'  bg='white'>
    <Image
      src={logo}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      height={'50vh'}
      // shadow='dark-lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>The New Way To Share</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
     
    </Stack>
    <Divider />
    <Center mt={2}>
  <Button alignItems={'center'} justifyContent={'center' }
      leftIcon={<FcGoogle/>} 
      variant={'outline'} 
      shadow={'lg'}  
      onClick={()=>login()}
      >
      Sign In Using Google 
      </Button>
     
   </Center> 
  </CardBody>
  
 
 
    
 
</Card>

    </Flex>
    
    </Flex>
    
  )
}

export default Login