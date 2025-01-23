import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Controller,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface ISignInValues {
  email: string;
  password: string;
}

interface ISignUpValues {
  first_name: string;
  last_name: string;
  username: string;
  mail: string;
  password: string;
}

const signInFunc = async (user: ISignInValues) => {
  try {
    const { data }: { data: ({ id: number } & ISignUpValues)[] } =
      await axios.get(
        `https://678fec7549875e5a1a93d806.mockapi.io/api/v1/auth?mail=${user.email}`
      );

    if (data.length === 0) {
      throw new Error("Указанная почта не зарегистрирована...");
    }

    if (data[0].password === user.password) {
      return data[0];
    } else {
      throw new Error("Неверный пароль пользователя...");
    }
  } catch (error) {
    throw new Error(
      (error as { message: string }).message ===
      "Неверный пароль пользователя..."
        ? "Неверный пароль пользователя..."
        : "Указанная почта не зарегистрирована..."
    );
  }
};

// Пример интеграции с mui material
const Normal: React.FC = () => {
  const { handleSubmit, control } = useForm<ISignInValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitOnValid: SubmitHandler<ISignInValues> = async (
    data: ISignInValues
  ) => {
    setErrorMessage(null); // Сбрасываем сообщение об ошибке перед новым запросом
    try {
      const user = await signInFunc(data);
      console.log("Успешный вход:", user);
      alert("Вход выполнен успешно!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const submitOnInValid: SubmitErrorHandler<ISignInValues> = (data) => {
    console.log("Ошибки валидации:", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitOnValid, submitOnInValid)}>
        {/* компонент от Hook Form для интеграции со стороними библиотеками (MUI, AntD, ...) */}
        {/* С помощью Controller Hook Form контролирует формы от сторонних библиотек */}
        <Controller
          name="email" // уникальный айди компонента (вместо {...register('email')})
          control={control} // обязательный атрибут для того, чтобы Hook form ослеживал компонент
          defaultValue="" // желательный атрибут
          // необязательный атрибут с валидацией
          rules={{
            required: "Email обязателен для заполнения",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Неверный формат email",
            },
          }}
          // обязательный атрибут для рендера инпута.
          // field - это свойтсва формы от Hook Form, который мы передём TextField.
          // то есть этим Hook form как бы берёт под свои власть и влияние TextField
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Пароль обязателен для заполнения",
            pattern: {
              value: /^.{6,}$/,
              message: "Пароль должен быть не менее 6 символов",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Пароль"
              type='password'
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
      {errorMessage && (
        <h4 style={{ color: "red", marginTop: "10px" }}>{errorMessage}</h4>
      )}
    </>
  );
};

export default Normal;
