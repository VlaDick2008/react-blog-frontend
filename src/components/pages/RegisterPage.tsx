import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../UI/Button';
import Input from '../UI/Input';

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onRegisterSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios
        .post('http://localhost:4040/register', {
          username: data.username,
          email: data.email,
          password: data.password,
        })
        .then(() => toast.success('Успешная регистрация!'))
        .then(() => {
          navigate('/login');
        });
    } catch (err) {
      toast.error('Не удалось зарегистрироваться');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onRegisterSubmit)}>
        <Input
          id="username"
          label="Имя пользователя"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
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
        <Button label="Регистрация" type="submit" disabled={isLoading} />
      </form>
    </section>
  );
};

export default RegisterPage;
