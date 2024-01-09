import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from "../../constants/user-constants/get-user-info-constants";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "../../constants/user-constants/login-user-constants";
import {
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from "../../constants/user-constants/logout-user-constants";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "../../constants/user-constants/register-user-constants";
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
} from "../../constants/user-constants/update-user-info-constants";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "../../constants/user-constants/reset-password-constants";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "../../constants/user-constants/forgot-password-constants";

import { TUserState, userReducer } from "../user-reducer";
import { TUserActions } from "../../actions/user-actions/user-union-types";

const initialState: TUserState = {
  user: {
    name: "",
    email: "",
  },

  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,

  getUserInfoRequest: false,
  getUserInfoSuccess: false,
  getUserInfoFailed: false,

  updateUserInfoRequest: false,
  updateUserInfoFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,

  isUserAuthorized: false,
};

describe("userReducer", () => {
  it("should hande the initial state of userReducer", () => {
    expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState);
  });
  // авторизация
  it("should handle LOGIN_USER_REQUEST action", () => {
    const action = {
      type: LOGIN_USER_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: true,
      loginSuccess: false,
      loginFailed: false,
    });
  });
  it("should handle LOGIN_USER_SUCCESS action", () => {
    const action = {
      type: LOGIN_USER_SUCCESS,
      data: {
        success: true,
        user: {
          name: "name",
          email: "email",
        },
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: false,
      loginSuccess: true,
      isUserAuthorized: true,
      loginFailed: false,
    });
  });
  it("should handle LOGIN_USER_ERROR action", () => {
    const action = {
      type: LOGIN_USER_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loginRequest: false,
      loginSuccess: false,
      loginFailed: true,
    });
  });
  // регистрация
  it("should handle REGISTER_USER_REQUEST action", () => {
    const action = {
      type: REGISTER_USER_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      registerRequest: true,
      registerSuccess: false,
      registerFailed: false,
    });
  });
  it("should handle REGISTER_USER_SUCCESS action", () => {
    const action = {
      type: REGISTER_USER_SUCCESS,
      data: {
        success: true,
        user: {
          name: "name",
          email: "email",
        },
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      registerRequest: false,
      registerSuccess: true,
      registerFailed: false,
    });
  });
  it("should handle REGISTER_USER_ERROR action", () => {
    const action = {
      type: REGISTER_USER_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      registerRequest: false,
      registerSuccess: false,
      registerFailed: true,
    });
  });
  // выход
  it("should handle LOGOUT_USER_REQUEST action", () => {
    const action = {
      type: LOGOUT_USER_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutSuccess: false,
      logoutFailed: false,
    });
  });
  it("should handle LOGOUT_USER_SUCCESS action", () => {
    const action = {
      type: LOGOUT_USER_SUCCESS,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: { name: "", email: "" },
      logoutRequest: false,
      logoutSuccess: true,
      loginSuccess: false,
      isUserAuthorized: false,
      logoutFailed: false,
    });
  });
  it("should handle LOGOUT_USER_ERROR action", () => {
    const action = {
      type: LOGOUT_USER_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutSuccess: false,
      logoutFailed: true,
    });
  });
  // получение информации о пользователе
  it("should handle GET_USER_INFO_REQUEST action", () => {
    const action = {
      type: GET_USER_INFO_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      getUserInfoRequest: true,
      getUserInfoFailed: false,
    });
  });
  it("should handle GET_USER_INFO_SUCCESS action", () => {
    const action = {
      type: GET_USER_INFO_SUCCESS,
      data: {
        success: true,
        user: {
          name: "name",
          email: "email",
        },
      },
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: {
        name: "name",
        email: "email",
      },
      getUserInfoRequest: false,
      getUserInfoSuccess: true,
      getUserInfoFailed: false,
    });
  });
  it("should handle GET_USER_INFO_ERROR action", () => {
    const action = {
      type: GET_USER_INFO_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      getUserInfoRequest: false,
      getUserInfoFailed: true,
    });
  });
  // обновление информации о пользователе
  it("should handle UPDATE_USER_INFO_REQUEST action", () => {
    const action = {
      type: UPDATE_USER_INFO_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      updateUserInfoRequest: true,
    });
  });
  it("should handle UPDATE_USER_INFO_SUCCESS action", () => {
    const action = {
      type: UPDATE_USER_INFO_SUCCESS,
      data: {
        name: "name",
        email: "email",
      },
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: {
        name: "name",
        email: "email",
      },
      updateUserInfoRequest: false,
    });
  });
  it("should handle UPDATE_USER_INFO_ERROR action", () => {
    const action = {
      type: UPDATE_USER_INFO_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      updateUserInfoRequest: false,
      updateUserInfoFailed: true,
    });
  });
  // восстановление пароля
  it("should handle FORGOT_PASSWORD_REQUEST action", () => {
    const action = {
      type: FORGOT_PASSWORD_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      forgotPasswordRequest: true,
      forgotPasswordSuccess: false,
      forgotPasswordFailed: false,
    });
  });
  it("should handle FORGOT_PASSWORD_SUCCESS action", () => {
    const action = {
      type: FORGOT_PASSWORD_SUCCESS,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordSuccess: true,
      forgotPasswordFailed: false,
    });
  });
  it("should handle FORGOT_PASSWORD_ERROR action", () => {
    const action = {
      type: FORGOT_PASSWORD_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      forgotPasswordRequest: false,
      forgotPasswordSuccess: false,
      forgotPasswordFailed: true,
    });
  });
  // сброс пароля
  it("should handle RESET_PASSWORD_REQUEST action", () => {
    const action = {
      type: RESET_PASSWORD_REQUEST,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: true,
      resetPasswordSuccess: false,
      resetPasswordFailed: false,
    });
  });
  it("should handle RESET_PASSWORD_SUCCESS action", () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordSuccess: true,
      resetPasswordFailed: false,
    });
  });
  it("should handle RESET_PASSWORD_ERROR action", () => {
    const action = {
      type: RESET_PASSWORD_ERROR,
    };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordSuccess: false,
      resetPasswordFailed: true,
    });
  });
});
