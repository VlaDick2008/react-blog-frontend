import React, { useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

import Input from '../UI/Input';
import Button from '../UI/Button';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];

const CreatePostPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { userData } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      summary: '',
      file: '',
      postContent: undefined,
    },
  });

  React.useEffect(() => {
    register('file', { required: true });
  }, [register]);

  React.useEffect(() => {
    if (userData === undefined) return navigate('/login');
  }, [navigate, userData]);

  const onEditorStateChange = (editorState: string) => {
    setValue('postContent', editorState);
  };

  const editorContent = watch('postContent');

  const onCreatePost: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.set('title', data.title);
    formData.set('summary', data.summary);
    formData.set('file', data.file[0]);
    formData.set('postContent', data.postContent);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/create_post`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      toast.success('Пост успешно создан!');
      navigate('/');
    } catch (err) {
      toast.error('Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onCreatePost)}>
      <Input
        id="title"
        label="Заголовок"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Крутой пост"
        required
      />
      <Input
        id="summary"
        label="Описание"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Этот пост очень крутой..."
        required
      />
      <Input
        label="Фото"
        id="file"
        type="file"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <label className="text-sm font-medium">Содержание записи</label>
      <hr className="h-[5px]" />
      <ReactQuill
        value={editorContent}
        onChange={onEditorStateChange}
        modules={modules}
        formats={formats}
      />
      <Button label="Создать пост" type="submit" disabled={isLoading} />
    </form>
  );
};

export default CreatePostPage;
