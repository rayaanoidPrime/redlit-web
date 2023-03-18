import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';


interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({ }) => {

    const [{ data, fetching }] = useMeQuery();
    let body = null;
    console.log("me query navbar : ", data);
    if (fetching) {
        console.log("loading")
        //data is loading
    }
    else if (!data?.me) {
        //user not logged in
        body = (
            <>
                <NextLink href='/login'>
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link mr={2}>Register</Link>
                </NextLink>
            </>
        )
    }
    else {
        //logged in
        body = (
            <Box>{data.me.username}</Box>
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

