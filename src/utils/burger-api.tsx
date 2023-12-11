import { NORMA_API } from "./data";
import { getCookie } from "./cookie-handler";
import {
  IIngredientType,
  IOrder,
  IIngredients,
  IForgotPassword,
  IResetPassword,
  IRegisterUser,
  ILoginUser,
  ILogoutUser,
  IRefreshToken,
  IUserGetInfo,
  IUserUpdateInfo,
} from "./types";
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function request<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);
  return checkResponse(res);
}
// ингредиенты
export async function getIngredients(): Promise<IIngredients> {
  const res = await request<IIngredients>(`${NORMA_API}/ingredients`, {});
  return res;
}
// заказ
export async function sendOrder(
  ingredients: IIngredientType[]
): Promise<IOrder> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  };
  const res = await request<IOrder>(`${NORMA_API}/orders`, options);
  return res;
}
// восстановление пароля
export async function forgotPassword(data: {
  valueEmail: string;
}): Promise<IForgotPassword> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.valueEmail,
    }),
  };
  const res = await request<IForgotPassword>(
    `${NORMA_API}/password-reset`,
    options
  );
  return res;
}
// сброс пароля
export async function resetPassword(data: {
  password: string;
  resetToken: string;
}): Promise<IResetPassword> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.resetToken,
    }),
  };
  const res = await request<IResetPassword>(
    `${NORMA_API}/password-reset/reset`,
    options
  );
  return res;
}
// регистрация
export async function registerUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}): Promise<IRegisterUser> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  };
  const res = await request<IRegisterUser>(
    `${NORMA_API}/auth/register`,
    options
  );
  return res;
}
// авторизация | вход
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ILoginUser> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const res = await request<ILoginUser>(`${NORMA_API}/auth/login`, options);
  return res;
}
// выход
export async function logoutUser(): Promise<ILogoutUser> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  const res = await request<ILogoutUser>(`${NORMA_API}/auth/logout`, options);
  return res;
}
// обновление токена
export async function refreshToken(): Promise<IRefreshToken> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  const res = await request<IRefreshToken>(`${NORMA_API}/auth/token`, options);
  return res;
}
// получение информации о пользователе
export async function getUserInfo(): Promise<IUserGetInfo | undefined> {
  if (!getCookie("accessToken")) {
    return;
  }
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  };
  const res = await request<IUserGetInfo>(`${NORMA_API}/auth/user`, options);
  return res;
}
// обновление информации о пользователе
export async function updateUserInfo({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<IUserGetInfo> {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };
  const res = await request<IUserUpdateInfo>(`${NORMA_API}/auth/user`, options);
  return res;
}
