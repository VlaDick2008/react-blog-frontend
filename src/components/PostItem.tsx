import React from 'react';
import { format } from 'date-fns';
import { IPost } from '../types';
import { Link } from 'react-router-dom';

const PostItem: React.FC<IPost> = ({ id, User, image, summary, title, createdAt }) => {
  const formatedCreationDate = React.useMemo(() => {
    if (!createdAt) {
      return null;
    }

    const convertedCreationDate = new Date(createdAt);

    return format(convertedCreationDate, 'H:mm, PP');
  }, [createdAt]);

  return (
    <Link to={`/post/${id}`}>
      <div className="border border-gray-400 p-5 rounded-xl flex md:flex-row flex-col md:justify-between md:gap-6 gap-4 hover:bg-gray-100 transition">
        {image && (
          <div className="md:w-[50%] w-full flex justify-center ">
            <img
              src={`${import.meta.env.VITE_API_URL}/${image}`}
              className="object-contain md:h-[300px] rounded-xl border border-gray-400"
              alt=""
            />
          </div>
        )}
        <div className={image ? 'md:w-[50%] w-full' : ''}>
          <div className="flex gap-2 items-center">
            <p className="font-medium md:text-lg text-xs leading-none">{User.username}</p>
            <time className="text-gray-400 text-xs">{formatedCreationDate}</time>
          </div>
          <h2 className="font-bold md:text-3xl text-sm my-2">{title}</h2>
          <p className="md:text-base text-xs">{summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
