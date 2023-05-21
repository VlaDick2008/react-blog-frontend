import React from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import Button from '../UI/Button';

const DeletePostPage = () => {
  const [currentPostId, setCurrentPostId] = React.useState();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => setCurrentPostId(res.data.id));
  }, [id]);

  const onDeleteClick = () => {
    try {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/post/${id}/delete`, {
          withCredentials: true,
          data: { postId: currentPostId },
        })
        .then(() => {
          toast.success('Удалено');
          navigate('/');
        });
    } catch (err) {
      toast.error('Что-то пошло не так');
    }
  };

  console.log(currentPostId);

  return (
    <div className="flex flex-col justify-center items-center mt-52 text-center">
      <p className="font-semibold text-3xl">Вы уверены, что ходите удалить эту запись?</p>
      <div className="flex gap-4 mt-5">
        <Button label="Да" onClick={onDeleteClick} />
        <Link to={'/'}>
          <Button label="Отмена" customStyle={'border-rose-500 hover:bg-rose-200'} />
        </Link>
      </div>
    </div>
  );
};

export default DeletePostPage;
