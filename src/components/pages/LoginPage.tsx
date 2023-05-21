import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../UI/Button';
import Input from '../UI/Input';

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { setUserData } = React.useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true },
        )
        .then((res) => {
          setUserData(res);
          toast.success('Успешный вход!');
        })
        .then(() => {
          navigate('/');
        });
    } catch (err) {
      toast.error('Не удалось войти');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onLoginSubmit)}>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="email"
        />
        <Input
          id="password"
          label="Пароль"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="password"
        />
        <Button label="Вход" type="submit" disabled={isLoading} />
      </form>
    </section>
  );
};

export default LoginPage;
