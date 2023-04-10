import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useAllpostsQuery } from '../generated/graphql';
import { Layout } from '../components/layout';
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Stack , Text } from '@chakra-ui/react';
import { useState } from 'react';


const Index : React.FC = () => {
    const [variables , setVariables] = useState({limit : 50 , cursor : null});
    const [{data , fetching}] = useAllpostsQuery({
      variables,
  });

  // console.log(data.allposts.hasMore);

  if( !fetching && !data){
    return (
    <Layout>
      <div>You got no data ! Oops !</div>
    </Layout>
    )
  }
 
  return ( 
    <Layout>
      <Flex align="center">
      <Heading >Redlit</Heading>
      <NextLink style={{marginLeft : "auto"}} href='/create-post'>Create A Post</NextLink>
      </Flex>
      <br/>
      { fetching && !data ? (
        <div>Loading ...</div>
        ) : (
          <Stack>
            {data.allposts.posts.map((p) => (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>{p.text.slice(0,50)}</Text>
              </Box>
              ))}
          </Stack>
        )
      }
     {
      data && data.allposts.hasMore ? (
        <Flex>
          <Button onClick={()=>{
            setVariables({
              limit : variables.limit,
              cursor : data.allposts.posts[data.allposts.posts.length-1].createdAt,
            })
          }} isLoading={fetching} m="auto" my={10}>Load More</Button>
        </Flex>
      ) : (null)
     } 
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient , {ssr : true})(Index)
