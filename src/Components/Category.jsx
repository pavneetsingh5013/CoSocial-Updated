import { Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react'


const Category = ({data}) => {
  const {colorMode} =useColorMode();
    const bg=useColorModeValue("gray.600","gray.300");
  return (
    
    <Flex cursor={'pointer'} my='3'>
        <Link to={`/category/${data.name}`}>
        <Tooltip hasArrow label={data.name} bg='red.600'>
       <Button>
        {data.iconSrc}
      </Button>
        </Tooltip>
        </Link>
    </Flex>
  )
}

export default Category