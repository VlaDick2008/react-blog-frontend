import React, { Dispatch } from 'react';
import Button from './Button';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: Dispatch<number>;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-3">
      {pages.map((page) => (
        <Button
          key={page}
          label={String(page)}
          pagination
          onClick={() => setCurrentPage(page)}
          customStyle={page === currentPage && 'bg-neutral-300'}
        />
      ))}
    </div>
  );
};

export default Pagination;
