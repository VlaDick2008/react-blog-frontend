import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IPost } from '../../types';
import { format } from 'date-fns';
import { UserContext } from '../../context/UserContext';
import ClipLoader from 'react-spinners/ClipLoader';

import Button from '../UI/Button';

const PostPage = () => {
  const [postData, setPostData] = React.useState<IPost>();
  const [isLoading, setIsLoading] = React.useState(true);

  const { userData } = useContext(UserContext);

  const { id } = useParams();

  const formatedCreationDate = React.useMemo(() => {
    if (!postData?.createdAt) {
      return null;
    }

    const convertedCreationDate = new Date(postData?.createdAt);

    return format(convertedCreationDate, 'H:mm, PP');
  }, [postData?.createdAt]);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => {
        setPostData(res.data);
      })
      .then(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-80">
        <ClipLoader size={150} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  if (!postData && !isLoading) {
    return (
      <div className="flex justify-center items-center text-3xl font-semibold mt-52 text-center">
        <p>Ой, пост не был найден 😢</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <div>
        <img
          src={`${import.meta.env.VITE_API_URL}/${postData?.image}`}
          className="md:h-96 h-full object-contain rounded-xl border border-gray-400"
          alt="post_image"
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="font-medium md:text-lg text-sm leading-none">{postData?.User.username}</p>
        <time className="text-gray-400 text-xs">{formatedCreationDate}</time>
        {!userData ? (
          <></>
        ) : (
          userData.data.id === postData?.User.id && (
            <>
              <Link to={`/post/${postData?.id}/edit`}>
                <Button label="Редактировать" small />
              </Link>
              <Link to={`/post/${postData?.id}/delete`}>
                <Button label="Удалить" small customStyle={'border-rose-500 hover:bg-rose-200'} />
              </Link>
            </>
          )
        )}
      </div>
      <h1 className="md:text-3xl text-xl font-bold leading-none text-center">{postData?.title}</h1>
      <p className="text-gray-700 font-light md:text-md text-sm text-center">{postData?.summary}</p>
      <div
        className="border border-gray-400 p-5 rounded-xl md:text-md text-sm w-full"
        dangerouslySetInnerHTML={{ __html: postData?.content as string }}
      />
    </div>
  );
};

export default PostPage;
