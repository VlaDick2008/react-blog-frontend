import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

const EditPostPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();

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
    setIsLoading(true);
    try {
      axios.get(`http://localhost:4040/post/${id}`).then((res) => {
        setValue('title', res.data.title);
        setValue('summary', res.data.summary);
        setValue('file', res.data.image);
        setValue('postContent', res.data.content);
      });
    } catch (err) {
      toast.error('Не удалось получить запись');
    } finally {
      setIsLoading(false);
    }
  }, [id, setValue]);

  const onEditorStateChange = (editorState: string) => {
    setValue('postContent', editorState);
  };

  const editorContent = watch('postContent');

  const onUpdatePost: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.set('title', data.title);
    formData.set('summary', data.summary);
    formData.set('file', data.file[0]);
    formData.set('postContent', data.postContent);
    formData.set('postId', id as string);

    try {
      await fetch('http://localhost:4040/post/:id/edit', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      toast.success('Пост успешно обновлён!');
      navigate('/');
    } catch (err) {
      toast.error('Что-то пошло не так');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onUpdatePost)}>
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
      />
      <label className="text-sm font-medium">Содержание записи</label>
      <hr className="h-[5px]" />
      <ReactQuill
        value={editorContent}
        onChange={onEditorStateChange}
        modules={modules}
        formats={formats}
        readOnly={isLoading}
      />
      <Button label="Обновить пост" type="submit" disabled={isLoading} />
    </form>
  );
};

export default EditPostPage;
