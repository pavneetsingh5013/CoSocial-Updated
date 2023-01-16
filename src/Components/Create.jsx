
import { Box, Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoCheckmark, IoChevronDown, IoCloudUpload, IoLocation, IoTrash, IoWarning } from 'react-icons/io5';
import { categories } from '../data';
import Spinner from './Spinner'
import { getStorage,  ref,  uploadBytesResumable,  getDownloadURL,  deleteObject,} from "firebase/storage";
import {firebaseApp} from '../firebase-config'
import { collection, setDoc, getFirestore, doc } from "firebase/firestore";
import AlertMsg from './AlertMsg';
import { fetchUser } from "../utils/fetchUser";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const navigate = useNavigate();
  const [userInfo] = fetchUser();
  // useEffect(() => {}, [title, location, category]);
  const fireStoreDb = getFirestore(firebaseApp);
  const{colorMode}=useColorMode();
  const bg=useColorModeValue("gray.50","gray.900");
  const textColor=useColorModeValue("gray.900","gray.50")
  const [title, settitle] = useState('');
  const [category, setcategory] = useState('Choose as Category');
  const [location, setlocation] = useState('');
  const [videoAsset, setvideoAsset] = useState(null);
  const [loading, setloading] = useState(false);
  const [progress, setProgress] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);



const storage=getStorage(firebaseApp);
const uploadDetails = async () => {
  try {
    setloading(true);
    if (title=='' || category=='Choose as Category' || videoAsset==null) {
      setAlert(true);
      setAlertStatus("error");
      setAlertIcon(<IoWarning fontSize={25} />);
      setAlertMsg("Required Fields are missing!");
      setTimeout(() => {
        setAlert(false);
      }, 4000);
      setloading(false);
    } else {
      const data = {
        id: `${Date.now()}`,
        title: title,
        userId: userInfo?.uid,
        category: category,
        location: location,
        videoUrl: videoAsset,
      };
      await setDoc(doc(fireStoreDb, "videos", `${Date.now()}`), data);
      setloading(false);
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};


const deleteImage = () => {
  const deleteRef = ref(storage, videoAsset);
  deleteObject(deleteRef)
    .then(() => {
      setvideoAsset(null);
      setAlert(true);
      setAlertStatus("error");
      setAlertIcon(<IoWarning fontSize={25} />);
      setAlertMsg("Your Video was Removed");
      setTimeout(() => {
        setAlert(false);
      }, 4000);
    })
    .catch((error) => {
      console.log(error);
    });
};
  const uploadImage = (e) => {
    setloading(true);
    const videoFile = e.target.files[0];
    const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadprog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadprog);
      },
      (error) => {
        console.log({ error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setvideoAsset(url);
          setloading(false);
          setAlert(true);
          setAlertStatus("success");
          setAlertIcon(<IoCheckmark fontSize={25} />);
          setAlertMsg("Your Video uploaded successfully");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };
useEffect(
  ()=>
  {console.log(videoAsset)}
,[videoAsset])

  return (
   

    <Flex
    justifyContent={'center'}
    alignItems='center'
    width={'full'}
    minHeight='90vh'
    padding={10}
    >
      <Flex width={'80%'} height='full' border={'1px'}  borderColor="gray.300"
      p='4'
      flexDirection={'column'}
      alignItems='center'
      borderRadius={4}
      justifyContent={'center'}>

        {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )}

        <Input
        variant={'flushed'}
        placeholder='Title'
        focusBorderColor='gray.400'
        isRequired
        errorBorderColor='red'
        type={'text'}
        value={title}
        _placeholder={{color:"gray.500"}}
        fontSize={20}
    onChange={(e)=>settitle(e.target.value)}
        />
        <Flex justifyContent={'space-between'} width={'full'}
        alignItems={'center'}
        gap={8}
        my={4}
        >
          <Menu>
  <MenuButton width="full" colorScheme="blue" as={Button} rightIcon={<IoChevronDown/>}>
    {category}
  </MenuButton>
  <MenuList zIndex={101} width={'md'} shadow="x1">
    {categories.map(data=>(
      <MenuItem key={data.id}
      _hover={{bg:'blackAlpha.300'}}
      fontSize={20}
      px={4}
      onClick={()=>setcategory(data.name)}
      >
        <Text fontSize={18} >{data.name}</Text> {data.iconSrc}
      </MenuItem>
    ))}
  </MenuList>
</Menu>


<InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<IoLocation 
        fontSize={20}
        color={`${colorMode=="dark"?"#f1f1f1" :"#111"}`}
         />}
    />
    <Input 
    variant={'flushed'}
        placeholder='Location'
        focusBorderColor='gray.400'
        isRequired
        errorBorderColor='red'
        type={'text'}
        _placeholder={{color:"gray.500"}}
        fontSize={20}
        value={location}
        onChange={(e)=>setlocation(e.target.value)}
    />
  </InputGroup>



        </Flex>

        <Flex
        border={'1px'}
        borderColor='gray.500'
        height={'200px'}
        width='full'
        borderRadius={'md'}
        overflow='hidden'
        position={'relative'}

        >
          {!videoAsset ? (
            <FormLabel width='full'>
              <Flex
              direction={"column"}
              alignItems='center'
              justifyContent={'center'}
              height='full'
              width={'full'}>
                <Flex
                direction={"column"}
                alignItems='center'
                justifyContent={'center'}
                height='full'
                width={'full'}
                cursor='pointer'
                >
                  {loading ?(<><Spinner msg={'UPLOADING YOUR VIDEO'} progress={progress}/></>) : (
                  <>
                  <IoCloudUpload 
                  fontSize={30}   
                  color={`${colorMode=="dark"?"#f1f1f1" :"#111"}`}
                  />
                  <Text mt={5} fontSize={20} color={textColor}>
                    Click To Upload Video
                  </Text>
                  
                  
                  </>) }
                </Flex>
              </Flex>
              {!loading && (
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              )}

            </FormLabel>
          ):(  <Flex
              width={"full"}
              height="full"
              justifyContent={"center"}
              alignItems={"center"}
              bg="black"
              position={"relative"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                width={"40px"}
                height={"40px"}
                rounded="full"
                bg={"red"}
                top={5}
                right={5}
                position={"absolute"}
                cursor={"pointer"}
                zIndex={10}
                onClick={deleteImage}
              >
                <IoTrash fontSize={20} color="white" />
              </Flex>
              <video
                src={videoAsset}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </Flex>)}

        </Flex>
        <Button
          isLoading={loading}
          loadingText="uploading"
          colorScheme="linkedin"
          variant={`${loading ? "outline" : "solid"}`}
          width={"xl"}
          _hover={{ shadow: "lg" }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
      </Flex>

    </Flex>
  )
}

export default Create