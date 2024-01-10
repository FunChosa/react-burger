import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "../../constants/user-constants/login-user-constants";
import { setCookie } from "../../../utils/cookie-handler";
import { loginUser } from "../../../utils/burger-api";
import { ISuccessLoginUser } from "../../../utils/types";
import { AppDispatch } from "../../..";
export interface ILoginUser {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly data: ISuccessLoginUser;
}

export interface ILoginUserError {
  readonly type: typeof LOGIN_USER_ERROR;
}

export type TLoginUserActions =
  | ILoginUser
  | ILoginUserSuccess
  | ILoginUserError;

export const loginUserRequest = (): ILoginUser => ({
  type: LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (
  res: ISuccessLoginUser
): ILoginUserSuccess => ({
  type: LOGIN_USER_SUCCESS,
  data: res,
});

export const loginUserError = (): ILoginUserError => ({
  type: LOGIN_USER_ERROR,
});

export const loginUserAction = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginUserRequest());
    try {
      const res = await loginUser({
        email,
        password,
      });
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(loginUserSuccess(res));
      } else {
        dispatch(loginUserError());
      }
    } catch (err) {
      dispatch(loginUserError());
      // console.log("LOGIN_USER_ERROR", err);
    }
  };
};
