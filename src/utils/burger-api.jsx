import { NORMA_API } from "./data";
import { getCookie } from "./cookie-handler";
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function request(url, options) {
  const res = await fetch(url, options);
  return checkResponse(res);
}

export async function getIngredients() {
  const res = await request(`${NORMA_API}/ingredients`);
  return res;
}

export async function sentOrder(ingredients) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  };
  const res = await request(`${NORMA_API}/orders`, options);
  return res;
}
// восстановление пароля
export async function forgotPassword(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.valueEmail,
    }),
  };
  const res = await request(`${NORMA_API}/password-reset`, options);
  return res;
}
// сброс пароля
export async function resetPassword(data) {
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
  const res = await request(`${NORMA_API}/password-reset/reset`, options);
  return res;
}
// регистрация
export async function registerUser({ email, name, password }) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password }),
  };
  const res = await request(`${NORMA_API}/auth/register`, options);
  return res;
}
// авторизация | вход
export async function loginUser({ email, password }) {
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
  const res = await request(`${NORMA_API}/auth/login`, options);
  return res;
}
// выход
export async function logoutUser() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  const res = await request(`${NORMA_API}/auth/logout`, options);
  return res;
}
// обновление токена
export async function refreshToken() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  const res = await request(`${NORMA_API}/auth/token`, options);
  return res;
}
// получение информации о пользователе
export async function getUserInfo() {
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
  const res = await request(`${NORMA_API}/auth/user`, options);
  return res;
}
// обновление информации о пользователе
export async function updateUserInfo({ name, email, password }) {
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
  const res = await request(`${NORMA_API}/auth/user`, options);
  return res;
}
