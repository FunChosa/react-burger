import { TUserActions } from "../actions/user-actions/user-union-types";
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
} from "../constants/user-constants/get-user-info-constants";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "../constants/user-constants/login-user-constants";
import {
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
} from "../constants/user-constants/logout-user-constants";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "../constants/user-constants/register-user-constants";
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_ERROR,
} from "../constants/user-constants/update-user-info-constants";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
} from "../constants/user-constants/reset-password-constants";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "../constants/user-constants/forgot-password-constants";

export type TUserState = {
  user: {
    name: string;
    email: string;
  };
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;

  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;

  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: boolean;

  getUserInfoRequest: boolean;
  getUserInfoSuccess: boolean;
  getUserInfoFailed: boolean;

  updateUserInfoRequest: boolean;
  updateUserInfoFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: boolean;

  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;

  isUserAuthorized: boolean;
};

const userInitialState: TUserState = {
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

export const userReducer = (state = userInitialState, action: TUserActions) => {
  switch (action.type) {
    // авторизация
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginRequest: true,
        loginSuccess: false,
        loginFailed: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginRequest: false,
        loginSuccess: true,
        isUserAuthorized: true,
        loginFailed: false,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        loginRequest: false,
        loginSuccess: false,
        loginFailed: true,
      };
    // регистрация
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerRequest: true,
        registerSuccess: false,
        registerFailed: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,
        registerFailed: false,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        registerRequest: false,
        registerSuccess: false,
        registerFailed: true,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        logoutRequest: true,
        logoutSuccess: false,
        logoutFailed: false,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: { name: null, email: null },
        logoutRequest: false,
        logoutSuccess: true,
        loginSuccess: false,
        isUserAuthorized: false,
        logoutFailed: false,
      };
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: false,
        logoutFailed: true,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        getUserInfoRequest: true,
        getUserInfoFailed: false,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.res.user.name,
          email: action.res.user.email,
        },
        getUserInfoRequest: false,
        getUserInfoSuccess: true,
        getUserInfoFailed: false,
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoFailed: true,
      };
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        updateUserInfoRequest: true,
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: {
          name: action.user.name,
          email: action.user.email,
        },
        updateUserInfoRequest: false,
        updateUserInfoFailed: false,
      };
    case UPDATE_USER_INFO_ERROR:
      return {
        ...state,
        updateUserInfoRequest: false,
        updateUserInfoFailed: true,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
        forgotPasswordSuccess: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
        forgotPasswordFailed: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
        forgotPasswordFailed: true,
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordSuccess: false,
        resetPasswordFailed: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordFailed: false,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
        resetPasswordFailed: true,
      };
    default:
      return state;
  }
};
