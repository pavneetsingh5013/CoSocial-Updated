import React from 'react'
import { Flex } from "@chakra-ui/react";
import Navbar from "../Components/Navbar"
import Category from "../Components/Category"
import Create from "../Components/Create"
import VideoPin from "../Components/VideoPin"
import Feed from "../Components/Feed"
import Search from "../Components/Search"
import {categories} from '../data'
import { useEffect, useState } from "react";

import {Route,Routes,useNavigate} from 'react-router-dom'
import UserProfile from '../Components/UserProfile';

const Home = ({user}) => {
  return (
    
    <>
    <Navbar user={user}/>

   <Flex width={'100vw'}>
   <Flex direction={'column'} justifyContent='start'
    alignItems={"center"}
    width="5%">
      {categories && categories.map(data=> <Category key={data.id} data={data}/>)}

    </Flex>

    <Flex width={'95%'}
    // justifyContent={"center"}
    // alignItems={"center"}
    px="4"
    >
      <Routes>
        <Route path="/" element={<Feed />}   />
        <Route path="/category/:categoryId" element={<Feed />}   />
        <Route path="/create" element={<Create />}   />
        <Route path="/videodetail/:videoId" element={<VideoPin />}   />
        <Route path="/search" element={<Search />}   />
        <Route path="/userDetail/:userId"element={<UserProfile />}   />

      </Routes>

    </Flex>


   </Flex >
    
    </>
  )
}

export default Home