import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IUser {
  first_name: string;
  last_name: string;
}

const fetchUser = async (user: IUser) => {
  try {
    const { data } = await axios.get(
      `https://678fec7549875e5a1a93d806.mockapi.io/api/v1/auth?first_name=${user.first_name}&last_name=${user.last_name}`
    );

    return data;
  } catch {
    return null;
  }
};

const Easy: React.FC = () => {
  const [isFound, setIsFound] = useState<true | false | null>(null);
  const { register, handleSubmit, getValues, watch } = useForm<IUser>();

  // 'ПОДПИСЫВАЕМСЯ' на изменеия в обоих полях:
  // теперь при изменениях в полях форма
  // значение watch_val будет изменяться
  // на актуальные значения в полях
  // и компонент будет рендериться ЗАНОВО
  // эффект схожий с эффектом useState()
  // надо быть аккуратным с лишними рендерами!
  const watch_val = watch();
  console.log("Значение изменилось на: ", watch_val.first_name);

  // подписываемся на конкретное поле
  // const watch_val = watch('first_name');

  const onSubmit = async (data: IUser) => {
    // РАЗОВО получаем значения в полях формы.
    // ни при инициализации, ни при изменении полей
    // компонент ренерится не будет
    const values = getValues();
    console.log('Значение при отправке: ', values.first_name);

    // const first_name = getValues('first_name');
    if (await fetchUser(data)) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", gap: 10 }}
      >
        <input
          {...register("first_name", {
            required: true,
          })}
          placeholder="Имя пользователя"
        />
        <input
          {...register("last_name", { required: true })}
          placeholder="Фамилия пользователя"
        />
        <button type="submit">Отправить</button>
      </form>
      {isFound ? (
        <h2>Пользователь найден</h2>
      ) : isFound ?? true ? (
        <h2>Введите значения</h2>
      ) : (
        <h2>Пользователь не найден</h2>
      )}
    </>
  );
};

export default Easy;
