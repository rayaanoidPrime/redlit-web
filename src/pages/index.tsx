import { NavBar } from '../components/NavBar'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useAllPostsQuery } from '../generated/graphql';



const Index = () => {

  const [{data , fetching}] = useAllPostsQuery();

  return ( 
    <>
    <NavBar />
    <div>Hellow World</div>
    <br/>
    {!data ? <div>Loading ...</div> :
     data.allposts.map((post)=><div key={post.id}>{post.title}</div>) }
    </>
  )
}

export default withUrqlClient(createUrqlClient , {ssr : true})(Index)
