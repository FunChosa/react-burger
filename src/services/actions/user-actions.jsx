import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserInfo,
  updateUserInfo,
  forgotPassword,
  resetPassword,
} from "../../utils/burger-api";
import { setCookie, deleteCookie } from "../../utils/cookie-handler";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_ERROR = "LOGOUT_USER_ERROR";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_ERROR = "GET_USER_INFO_ERROR";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_ERROR = "UPDATE_USER_INFO_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
// авторизация | вход - приходят accessToken и refreshToken
export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
      const res = await loginUser({
        email,
        password,
      });
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_USER_SUCCESS, res: res });
      } else {
        dispatch({ type: LOGIN_USER_ERROR });
      }
    } catch (err) {
      dispatch({ type: LOGIN_USER_ERROR });
      console.log("LOGIN_USER_ERROR", err);
    }
  };
};
// регистрация - приходят accessToken и refreshToken
export const register = ({ email, name, password }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
      const res = await registerUser({ email, name, password });
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);

        dispatch({ type: REGISTER_USER_SUCCESS, res: res });
      } else {
        dispatch({ type: REGISTER_USER_ERROR });
      }
    } catch (err) {
      dispatch({ type: REGISTER_USER_ERROR });
      console.log("REGISTER_USER_ERROR", err);
    }
  };
};
// выход
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_USER_REQUEST });
    try {
      const res = await logoutUser();
      if (res && res.success) {
        localStorage.removeItem("refreshToken");
        deleteCookie("accessToken");
        dispatch({ type: LOGOUT_USER_SUCCESS });
      } else {
        dispatch({ type: LOGOUT_USER_ERROR });
      }
    } catch (err) {
      dispatch({ type: LOGOUT_USER_ERROR });
      console.log("LOGOUT_USER_ERROR", err);
    }
  };
};
// получение информации о пользователе
export const getUserInfoRequest = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
    try {
      const res = await getUserInfo();
      if (res && res.success) {
        dispatch({ type: GET_USER_INFO_SUCCESS, res: res });
      } else {
        dispatch({ type: GET_USER_INFO_ERROR });
      }
    } catch (err) {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        const res = await refreshToken();
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      } else {
        dispatch({ type: GET_USER_INFO_ERROR });
        // console.log("GET_USER_INFO_ERROR", err);
      }
    }
  };
};
// обновление информации о пользователе
export const updateUserInfoRequest = ({ name, email, password }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_INFO_REQUEST });
    try {
      const res = await updateUserInfo({ name, email, password });
      if (res && res.success) {
        dispatch({ type: UPDATE_USER_INFO_SUCCESS, user: res.user });
      } else {
        dispatch({ type: UPDATE_USER_INFO_ERROR });
      }
    } catch (err) {
      if (err.message === "jwt expired" || err.message === "jwt malformed") {
        const res = await refreshToken();
        if (res && res.success) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
        }
      } else {
        dispatch({ type: UPDATE_USER_INFO_ERROR });
        console.log("UPDATE_USER_INFO_ERROR", err);
      }
    }
  };
};

export const forgotPasswordRequest = (data) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
      const res = await forgotPassword(data);
      if (res && res.success) {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      } else {
        dispatch({ type: FORGOT_PASSWORD_ERROR });
      }
    } catch (err) {
      dispatch({ type: FORGOT_PASSWORD_ERROR });
      console.log("FORGOT_PASSWORD_ERROR", err);
    }
  };
};

export const resetPasswordRequest = (data) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      const res = await resetPassword(data);
      if (res && res.success) {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      } else {
        dispatch({ type: RESET_PASSWORD_ERROR });
      }
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_ERROR });
      console.log("RESET_PASSWORD_ERROR", err);
    }
  };
};
