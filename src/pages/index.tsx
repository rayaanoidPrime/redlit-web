import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useAllpostsQuery } from '../generated/graphql';
import { Layout } from '../components/layout';
import NextLink from 'next/link';


const Index : React.FC = () => {
  const [{data , fetching}] = useAllpostsQuery({
    variables : {
      limit : 100,
    }
  });
  return ( 
    <Layout>
      <div>Hellow World</div>
      <br/>
      <NextLink href='/create-post'>Create A Post</NextLink>
      {!data ? <div>Loading ...</div> :
      data.allposts.map((post)=><div key={post.id}>{post.title}</div>) }
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient , {ssr : true})(Index)
