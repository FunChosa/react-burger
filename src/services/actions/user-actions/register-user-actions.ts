import { registerUser } from "../../../utils/burger-api";
import { setCookie } from "../../../utils/cookie-handler";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "../../../services/constants/user-constants/register-user-constants";
import { IRegisterUser } from "../../../utils/types";
import { AppDispatch } from "../../..";

export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly data: IRegisterUser;
}

export interface IRegisterUserError {
  readonly type: typeof REGISTER_USER_ERROR;
}

export type TRegisterUserActions =
  | IRegisterUserRequest
  | IRegisterUserSuccess
  | IRegisterUserError;

export const registerUserRequest = (): IRegisterUserRequest => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (
  res: IRegisterUser
): IRegisterUserSuccess => ({
  type: REGISTER_USER_SUCCESS,
  data: res,
});

export const registerUserError = (): IRegisterUserError => ({
  type: REGISTER_USER_ERROR,
});

export const registerUserAction = (
  email: string,
  name: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(registerUserRequest());
    try {
      const res = await registerUser({ email, name, password });
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(registerUserSuccess(res));
      } else {
        dispatch(registerUserError());
      }
    } catch (err) {
      dispatch(registerUserError());
      console.log("REGISTER_USER_ERROR", err);
    }
  };
};
