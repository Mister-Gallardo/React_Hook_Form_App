import React from 'react';
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface FormValues {
  email: string;
  password: string;
}

const Hard: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>();

  const submitOnValid: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)
  }

  const submitOnInValid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitOnValid, submitOnInValid)}>
      <TextField {...register('email', {required: true})} label='mail'></TextField>
      <TextField {...register('password', {required: true})} label='password'></TextField>
      <Button type='submit' variant='contained' color='primary'>Отправить</Button>
    </form>
  )
};

export default Hard;
