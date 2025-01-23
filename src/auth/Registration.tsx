import { Button, Slide, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface ISignUpValues {
  first_name: string;
  last_name: string;
  username: string;
  mail: string;
  password: string;
}

const signUpFunc = async (user: ISignUpValues) => {
  try {
    const { data } = await axios.post(
      `https://678fec7549875e5a1a93d806.mockapi.io/api/v1/auth`,
      user
    );
    
    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const Registration: React.FC = () => {
  const [flag, setFlag] = useState(false);
  const [isError, setIsError] = useState(false);
  const { handleSubmit, control } = useForm<ISignUpValues>();

  const submitOnValid: SubmitHandler<ISignUpValues> = async (
    data: ISignUpValues
  ) => {
    if (!flag) {
      setFlag(true);
    } else {
      try {
        await signUpFunc(data);
        alert('Пользователь успешно зарегистрирован!');
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    }
  };

  const submitOnInValid: SubmitErrorHandler<ISignUpValues> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitOnValid, submitOnInValid)}
      style={{
        width: "fit-content",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: 25,
      }}
    >
      {/* email */}
      <Controller
        name="mail"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Неверный формат email",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            sx={{ width: "90vw", maxWidth: 350 }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      {flag && (
        <>
          {/* Username */}
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9]{4,}$/,
                message: "Неверный формат никнейма",
              },
            }}
            render={({ field, fieldState }) => (
              <Slide direction="right" in={true}>
                <TextField
                  {...field}
                  sx={{ width: "90vw", maxWidth: 350 }}
                  label="Username"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Slide>
            )}
          />

          {/* firstname */}
          <Controller
            name="first_name"
            control={control}
            defaultValue=""
            rules={{
              required: "Firstname is required",
              pattern: {
                value: /^.{2,}$/,
                message: "Имя должно быть не менее 2 символов",
              },
            }}
            render={({ field, fieldState }) => (
              <Slide direction="right" in={true}>
                <TextField
                  {...field}
                  sx={{ width: "90vw", maxWidth: 350 }}
                  label="Firstname"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Slide>
            )}
          />

          {/* Lastname */}
          <Controller
            name="last_name"
            control={control}
            defaultValue=""
            rules={{
              pattern: {
                value: /^[a-zA-Zа-яА-Я]+$/,
                message: "Неверный формат фамилии",
              },
            }}
            render={({ field, fieldState }) => (
              <Slide direction="right" in={true}>
                <TextField
                  {...field}
                  sx={{ width: "90vw", maxWidth: 350 }}
                  label="Lastname"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Slide>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              pattern: {
                value: /^[a-zA-Z0-9]{6,}$/,
                message: "Пароль должен быть не менее 6 символов",
              },
            }}
            render={({ field, fieldState }) => (
              <Slide direction="right" in={true}>
                <TextField
                  {...field}
                  sx={{ width: "90vw", maxWidth: 350 }}
                  label="Password"
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              </Slide>
            )}
          />
        </>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ width: "90vw", maxWidth: 350 }}
      >
        {flag ? "Отправить" : "Далее"}
      </Button>
      {isError && (
        <h3 style={{ textAlign: "center", color: "red", marginTop: 10 }}>
          Произошла непредвиденная ошибка...
        </h3>
      )}
    </form>
  );
};

export default Registration;
