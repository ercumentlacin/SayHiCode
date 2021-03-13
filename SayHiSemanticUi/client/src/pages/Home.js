import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = (props) => {
  debugger;
  const {
    loading,
    data: { getBookPosts: bookPosts },
  } = useQuery(FETCH_BOOKPOSTS_QUERY);
  console.log(bookPosts);
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {bookPosts &&
              bookPosts.map((bpost) => (
                <Grid.Column key={bpost.id} style={{ marginBottom: 20 }}>
                  <PostCard bookPost={bpost} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};
const FETCH_BOOKPOSTS_QUERY = gql`
  {
    getBookPosts {
      id
      author
      name
      createdAt
      user {
        username
        imageUrl
      }
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default Home;
