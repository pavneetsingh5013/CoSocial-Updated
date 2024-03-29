import {
    Box,
    Flex,
    Image,
    Text,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { fetchUser } from "../utils/fetchUser";
  import moment from "moment";
  import { Link } from "react-router-dom";
  import { IoHeart } from "react-icons/io5";
  
  const VideoDetail = ({ data }) => {
    const avatar =
  "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";


    const { colorMode } = useColorMode();
    const [isFavourite, setIsFavourite] = useState(false);
    const bg = useColorModeValue("blackAlpha.700", "gray.900");
    const textColor = useColorModeValue("gray.100", "gray.100");
    const [userInfo] = fetchUser();
    return (
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        direction={"column"}
        cursor={"pointer"}
        shadow={"lg"}
        _hover={{ shadow: "xl" }}
        rounded={"md"}
        overflow={"hidden"}
        position={"relative"}
        maxHeight={"230"}
        maxWidth={"300px"}
      >
        <Link to={`/videoDetail/${data.id}`}>
          <video
            src={data.videoUrl}
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            muted
          />
          <Flex
            position={"relative"}
            bottom={0}
            left={0}
            p={2}
            bg={bg}
            width={"full"}
            direction="column"
          >
            <Flex
              width={"full"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Text color={textColor} isTruncated fontSize={20}>
                {data.title}
              </Text>
              {/* <Link to ={'/userDetail/${userId}'}> */}
              <Image
                src={userInfo?.photoURL ? userInfo?.photoURL:avatar}
                rounded={"full"}
                width={"50px"}
                height={"50px"}
                border={"2px"}
                borderColor={bg}
                mt={-10}
              />
              {/* </Link> */}
            </Flex>
            <Text fontSize={12} color={textColor} ml={"auto"}>
              {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
            </Text>
          </Flex>
        </Link>
      </Flex>
    );
  };
  
  export default VideoDetail;