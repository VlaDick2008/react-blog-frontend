import React from 'react';
import { IPost } from './types';
import axios from 'axios';

import PostItem from './components/PostItem';
import Pagination from './components/UI/Pagination';

const App = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const postsPerPage = 20;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    axios.get('http://localhost:4040/posts').then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {currentPost.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          image={post.image}
          User={post.User}
          content={post.content}
          createdAt={post.createdAt}
        />
      ))}
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
