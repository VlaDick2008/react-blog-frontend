import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import Button from '../components/UI/Button';

const emptyUserData = {
  data: {
    email: '',
    id: '',
    username: '',
  },
};

const Header = () => {
  const { setUserData, userData } = React.useContext(UserContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/profile`, { withCredentials: true })
      .then((userData) => {
        setUserData(userData);
      });
  }, [setUserData]);

  const onLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
    setUserData(null);
    navigate('/');
  };

  return (
    <header className="flex flex-row justify-between items-center md:mb-10 mb-5">
      <Link to="/" className="flex flex-row gap-1 leading-none">
        <span className="font-bold md:text-3xl text-xl">Крутой</span>
        <span className="italic font-light underline md:text-base text-xs">Блог</span>
      </Link>
      {!userData?.data?.username ? (
        <nav className="flex flex-row gap-4">
          <Link to="/login">
            <Button label="Вход" />
          </Link>
          <Link to="/register">
            <Button label="Регистрация" />
          </Link>
        </nav>
      ) : (
        <nav className="flex md:flex-row flex-col md:gap-4 gap-2 items-center justify-center">
          <p className="text-xs">Добро пожаловать, {userData?.data?.username}</p>
          <div className="flex gap-2">
            <Link to="/create">
              <Button label="Создать пост" />
            </Link>
            <Button onClick={onLogout} label="Выход" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
