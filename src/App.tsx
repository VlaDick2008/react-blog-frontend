import React from 'react';
import { IPost } from './types';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

import PostItem from './components/PostItem';
import Pagination from './components/UI/Pagination';

const App = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(false);

  const postsPerPage = 20;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => setPosts(res.data))
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-80">
        <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

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
