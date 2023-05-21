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
      <div className="border border-gray-400 p-5 rounded-xl flex justify-between gap-6 hover:bg-gray-100 transition">
        {image && (
          <div className="w-[50%] flex justify-center ">
            <img
              src={`${import.meta.env.VITE_API_URL}/${image}`}
              className="object-contain h-[300px] rounded-xl border border-gray-400"
              alt=""
            />
          </div>
        )}
        <div className={image ? 'w-[50%]' : ''}>
          <div className="flex gap-2 items-end">
            <p className="font-medium text-lg leading-none">{User.username}</p>
            <time className="text-gray-400 text-xs">{formatedCreationDate}</time>
          </div>
          <h2 className="font-bold text-3xl my-2">{title}</h2>
          <p>{summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
