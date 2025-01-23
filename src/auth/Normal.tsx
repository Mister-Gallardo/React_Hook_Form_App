import React, { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

interface FormValues {
  first_name: string;
  last_name: string;
}

const fetchUser = async (user: FormValues) => {
  try {
    const { data } = await axios.get(
      `https://678fec7549875e5a1a93d806.mockapi.io/api/v1/auth?first_name=${user.first_name}&last_name=${user.last_name}`
    );

    return data;
  } catch {
    return null;
  }
};

// простой пример интеграции с mui material
const Normal: React.FC = () => {
  const [isFound, setIsFound] = useState<true | false | null>(null);
  const { handleSubmit, register } = useForm<FormValues>();

  const submitOnValid: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (await fetchUser(data)) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  };

  const submitOnInValid: SubmitErrorHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitOnValid, submitOnInValid)}>
        <TextField
          {...register("first_name", { required: true })}
          label="mail"
        ></TextField>
        <TextField
          {...register("last_name", { required: true })}
          label="password"
        ></TextField>
        <Button type="submit" variant="contained" color="primary">
          Отправить
        </Button>
      </form>
      {isFound ? <h2>Пользователь найден!</h2> : isFound === false ? <h2>Пользователь не найден!</h2> : <h2>Введите значения!</h2>}
    </>
  );
};

export default Normal;
