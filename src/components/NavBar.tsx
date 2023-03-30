import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';


interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [ {fetching : logoutFetching} , Logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause : isServer()  
    });
    let body = null;
    // console.log("me query navbar : ", data);
    if (fetching) {
        console.log("loading")
        //data is loading
    }
    else if (!data?.me) {
        //user not logged in
        body = (
            <Flex>
                <NextLink style={{marginRight : 10}} href='/login'>Login</NextLink>
                <NextLink href='/register'>Register</NextLink>
            </Flex> 
        )
    }
    else {
        //logged in
        body = (
            <Flex>
            <Box mr={3}>{data.me.username}</Box>
            <Button 
                onClick={()=>{
                    Logout( {});
                }} 
                variant='link' 
                isLoading ={logoutFetching}
                >Logout
            </Button>
            </Flex>
        )
    }

    return (
        <Flex p={4} bg='tomato'>
            <Box ml='auto'>
                {body}
            </Box>
        </Flex>
    )
}

